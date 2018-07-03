import User from "../../models/user";
import Task from "../../models/task";
import Project from "../../models/project";
import Group from "../../models/group";
import {teamError} from "../formatErrors";
import Organization from '../../models/organization';


const TeamType = `
    type Team {
        _id: String
        teamtitle: String!
        teamdescription: String
        owner: User
        users: [User]
        tasks: [Task]
        projects: [Project]
        defaultproject: Project
        groups: [Group]
        organization: Organization
    }
    
    type CreateTeamResponse {
        ok: Boolean!
        team: Team
        errors: [Error!]
    }
`;

const TeamQuery = `
    allTeams: [Team]
    team(_id: String): Team
    teamsByOrg(organization: String): [Team]
    teamsByOwner( owner: String ): [Team]
    teamsByUser( user: String ): [Team]
`;

const TeamMutation = `
    createTeam(
        teamtitle: String!,
        teamdescription: String,
        owner: String,
        organization: String!,
    ) : CreateTeamResponse
    addTeamUser(
        _id: String
        user: String,
    ) : Team
    removeTeamUser(
        _id: String 
        user: String
        projectId: String
    ): Team
`;

const TeamQueryResolver = {
    allTeams: async (parent, args, {Team}) => {
        const teams = await Team.find({});
        return teams.map(team => {
            team._id = team._id.toString();
            return team
        })
    },
    team: async (parent, args, {Team}) => {
        return await Team.findById(args._id.toString())
    },
    teamsByOrg: async (parent, { organization }, { Team }) => {
        const teamOrg = await Organization.findById( organization )
        return await Team.find({ organization: teamOrg })
    },
    teamsByOwner: async (parent, args, { Team }) => {
        const teamowner = await User.findById(args.owner.toString());
        return await Team.find({ owner: teamowner })
    },
    teamsByUser: async (parent, args, {Team}) => {
        const owner = await User.findById(args.user.toString());
        return await Team.find({users: owner})
    },
};



const TeamNested = {
    tasks: async ({_id}) => {
        return (await Task.find({team: _id}))
    },
    projects: async ({_id}) => {
        return (await Project.find({team: _id}))
    },
    users: async ({_id}) => {
        return (await User.find({team: _id}))
    },
    owner: async ({owner}) => {
        return await User.findById(owner)
    },
    defaultproject: async ({defaultproject}) => {
        return await Project.findById(defaultproject)
    },
    organization: async ({organization}) => {
        return await Organization.findById(organization)
    },
    groups: async ({_id}) => {
        return (await Group.find({team: _id}))
    }
};

const TeamMutationResolver = {
    createTeam: async (parent, {teamtitle, teamdescription, owner, organization}, {Team}) => {
        try {
            const err = [];
            let teamtitleErr = await teamError(teamtitle);
            if (teamtitleErr) {
                err.push(teamtitleErr)
            }
            if (!err.length) {
                let newteam = await new Team({
                    teamtitle,
                    teamdescription,
                    owner,
                    users: owner,
                    organization
                }).save();
                console.log('saved team');
                //look at user collection and find user that has id of owner
                let teamuser = await User.findById(owner.toString());
                //look at org collection and find org that has id of organization
                let teamorganization = await Organization.findById(organization);
                //using the found org look at its teams and push the new teams id into it
                teamorganization.team.push(newteam._id);
                //wait for teamorg to come back and save
                await teamorganization.save();

                //save new project to the new team w/ users
                let project = await new Project({
                    projecttitle: 'General',
                    projectdescription: `General Project for ${teamtitle}`,
                    team: newteam._id,
                    leader: teamuser._id,
                    users: teamuser._id
                }).save();
                console.log('saved project')

                //save new group to the new project and team w/users
                let group = await new Group({
                    grouptitle: 'General',
                    groupdescription: `General Group`,
                    project: project._id,
                    team: newteam._id,
                    users: teamuser._id
                }).save();
                //look at team owner push the new group id into his groups
                teamuser.groups.push(group._id);
                teamuser.projects.push(project._id);
                teamuser.team.push(newteam._id);
                await teamuser.save();

                await Team.findByIdAndUpdate(newteam._id, {
                        $set: {
                            defaultproject: project._id,
                            projects: project._id,
                            groups: group._id,
                        }
                    },
                    {new: true}
                );
                await Project.findByIdAndUpdate(project._id, {
                        $set: {
                            defaultgroup: group._id,
                            group: group._id
                        }
                    },
                    {new: true}
                );
                return {
                    ok: true,
                    newteam,
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
                errors: [{path: 'teamtitle', message: 'something did not go well'}]
            }
        }
    },
    addTeamUser: async (parent, {_id, user}, {Team}) => {
        let teamuser = await User.findById(user);
        let teams = await Team.findById(_id);
        teamuser.team.push(teams._id);
        await teamuser.save();
        teams.users.push(teamuser._id);
        await teams.save();
        return teams
    },
    removeTeamUser: async (parent, {_id, user, projectId}, {Team}) => {
        console.log(_id)
        let teamUserToRemove = await User.findById(user);
        let teamToRemoveUserFrom = await Team.findById(_id);
        let projectIdArray = projectId.split(',');

        if(projectId) {
            //going into team
            await Project.update(
                //find each project with id provided from array
                { _id: { $in: projectIdArray } },
                //got to that projects users and pull out user from that array
                { $pull: { users: teamUserToRemove._id  } },
                //multiple documents
                { multi: true }
            );

            await User.update(
                //find user with id provided
                { _id: teamUserToRemove._id },
                //go to users team's pull teams provided from array
                { $pullAll: { team: projectId.split(',') } }
            );
            //go into users team array and pull the id of the team were removing them from
            teamUserToRemove.team.pull(teamToRemoveUserFrom._id);
            await teamUserToRemove.save();

            //go into team's users array and pull the id of the user were removing from the org
            teamToRemoveUserFrom.users.pull(teamUserToRemove._id);
            await teamToRemoveUserFrom.save();

            return teamToRemoveUserFrom
        }else{
            //go into users team array and pull the id of the team were removing them from
            teamUserToRemove.team.pull(teamToRemoveUserFrom._id);
            await teamUserToRemove.save();

            //go into team's users array and pull the id of the user were removing from the org
            teamToRemoveUserFrom.users.pull(teamUserToRemove._id);
            await teamToRemoveUserFrom.save();

            return teamToRemoveUserFrom
        }
    }
};

export {TeamType, TeamMutation, TeamQuery, TeamQueryResolver, TeamNested, TeamMutationResolver};
