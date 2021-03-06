import User from "../../models/user";
import UserTypeOrg from "../../models/usertypeorg";
import Team from "../../models/team";
import Task from "../../models/task";
import {orgError} from "../formatErrors";
import Group from "../../models/group";
import Project from "../../models/project";

const OrganizationType = `
    type Organization {
        _id: String
        orgtitle: String
        orgdescription: String
        owner: User
        users: [User]
        usertypes: [UserTypeOrg]
        teams: [Team]
    }
    type CreateOrgResponse {
        ok: Boolean!
        organization: Organization
        errors: [Error!]
    }
`;

const OrganizationQuery = `
    allOrganizations: [Organization]
    organization(_id: String): Organization
    getOrgByOwner( owner: String ): [Organization]
`;

const OrganizationMutation = `
    createOrganization(
        orgtitle: String!
        orgdescription: String
        owner: String
    ) : CreateOrgResponse
    addOrgUser(
        _id: String
        user: String
    ) : User
    removeOrgUser(
        _id: String 
        user: String
        teamId: String
    ): Organization
    removeTeamFromOrg( 
        teamToDeleteId: String 
        teamOrgId: String 
        teamOwnerId: String
        teamProjects: String
        teamUsers: String
        teamGroupsTasks: String
        teamGroups: String
    ): Organization

`;

const OrganizationQueryResolver = {
    allOrganizations: async (parent, args, {Organization}) => {
        const orgs = await Organization.find({});
        return orgs.map(org => {
            org._id = org._id.toString();
            return org
        })
    },
    organization: async (parent, args, {Organization}) => {
        return await Organization.findById(args._id.toString())
    },
    getOrgByOwner: async (parent, args, { Organization }) => {
        const orgowner = await User.findById(args.owner.toString());
        return await Organization.find({ owner: orgowner })
    }
};

const OrganizationNested = {
    owner: async ({owner}) => {
        return await User.findById(owner)
    },
    users: async ({_id}) => {
        return await User.find({organization: _id})
    },
    teams: async ({_id}) => {
        return (await Team.find({organization: _id}))
    },
    usertypes: async ({usertypes}) => {
        return (await UserTypeOrg.find({usertypes: _id}))
    },
};

const OrganizationMutationResolver = {
    createOrganization: async (parent, {orgtitle, orgdescription, owner}, {Organization}) => {
        try {
            const err = [];
            let orgtitleErr = await orgError(orgtitle);
            if (orgtitleErr) {
                err.push(orgtitleErr)
            }
            //if no error then
            if (!err.length) {
                //save the new organization
                const newOrganization = await new Organization({
                    orgtitle,
                    orgdescription,
                    owner,
                    users: owner,
                }).save();
                //find user object of the person who created the new org
                let orgUser = await User.findById(owner);
                //look at the user object's organizations and push the new org id into the array
                orgUser.organization.push(newOrganization._id);
                //then save
                await orgUser.save();
                return {
                    ok: true,
                    newOrganization,
                };
            } else {
                return {
                    ok: false,
                    errors: err,
                }
            }
        } catch (e) {
            return {
                ok: false,
                errors: [{path: 'orgtitle', message: 'something did not go well'}]
            }
        }
    },
    addOrgUser: async (parent, {_id, user}, {Organization}) => {
        let orguser = await User.findById(user);
        let orgs = await Organization.findById(_id);
        orguser.organization.push(orgs._id);
        await orguser.save();
        orgs.users.push(orguser._id);
        await orgs.save();
        return orguser
    },
    removeOrgUser: async (parent, {_id, user, teamId}, {Organization}) => {
        let orgUserToRemove = await User.findById(user);
        let orgToRemoveUserFrom = await Organization.findById(_id);
        let teamIdArray = teamId.split(',');

        await Team.update(
            {_id: {$in: teamIdArray}},
            {$pull: {users: orgUserToRemove._id}},
            {multi: true}
        );

        await User.update(
            {_id: orgUserToRemove._id},
            {$pullAll: {team: teamId.split(',')}}
        );

        orgUserToRemove.organization.pull(orgToRemoveUserFrom._id);
        await orgUserToRemove.save();

        orgToRemoveUserFrom.users.pull(orgUserToRemove._id);
        await orgToRemoveUserFrom.save();

        return orgToRemoveUserFrom
    },
    removeTeamFromOrg: async (parent, {teamUsers, teamProjects, teamGroups, teamGroupsTasks, teamOrgId, teamOwnerId, teamToDeleteId}, {Organization}) => {
        let user = await User.findById({_id: teamOwnerId })
        user.projects.pull({_id: teamProjects.split() })
        user.groups.pull({_id: teamGroups.split() })
        user.team.pull({_id: teamToDeleteId })
        if(teamOrgId){
            await Organization.update(
                {_id: teamOrgId },
                { $pull: { team: teamToDeleteId } },
                {multi: true}
            );
        }
        if(teamGroupsTasks){
            await Task.remove(
                {_id: {$in: teamGroupsTasks.split(',')}},
            );
        }
        if(teamGroups){
            await Group.remove(
                {_id: {$in: teamGroups.split(',')}},
            );
        }
        if(teamProjects){
            await Project.remove(
                {_id: {$in: teamProjects.split(',')}},
            );
        }
            await Team.deleteOne(
                {_id: teamToDeleteId },
            );
        }
};


export {OrganizationType, OrganizationMutation, OrganizationQuery, OrganizationQueryResolver, OrganizationNested, OrganizationMutationResolver};
