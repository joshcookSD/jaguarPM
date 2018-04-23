import User from "../../models/user";
import UserTypeOrg from "../../models/usertypeorg";
import Team from "../../models/team";
import {orgError} from "../formatErrors";
import requiresAuth from '../permissions';

const OrganizationType = `
    type Organization {
        _id: String
        orgtitle: String!
        orgdescription: String
        usertypes: [UserTypeOrg]
        owner: User
        users: [User]
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
`;

const OrganizationMutation = `
    createOrganization(
        orgtitle: String!,
        orgdescription: String,
        owner: String,
    ) : CreateOrgResponse
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
};

const OrganizationNested = {
    owner: async ({_id}) => {
        return (await User.findById(_id))
    },
    users: async ({_id}) => {
        return (await User.find({organization: _id}))
    },
    teams: async ({_id}) => {
        return (await Team.find({organization: _id}))
    },
    usertypes: async ({usertypes}) => {
        return (await UserTypeOrg.find({usertypes: _id}))
    },
};

const OrganizationMutationResolver ={
    createOrganization: requiresAuth.createResolver(async (parent, {orgtitle, orgdescription, owner}, {Organization}) => {
        try {
            const err = [];
            let orgtitleErr = await orgError(orgtitle);
            if(orgtitleErr) { err.push(orgtitleErr)}
            if(!err.length) {
                const organization = await Organization.create({
                    orgtitle,
                    orgdescription,
                    owner,
                });
                return {
                    ok: true,
                    organization,
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
    })
};

export {OrganizationType, OrganizationMutation, OrganizationQuery, OrganizationQueryResolver, OrganizationNested, OrganizationMutationResolver};
