import User from "../../models/user";
import Organization from "../../models/organization";

const UserTypeOrgType = `
    type UserTypeOrg {
        _id: String
        usertype: String
        organization: Organization
        users: [User]
    }
`;

const UserTypeOrgQuery = `
    allUserTypeOrgs: [UserTypeOrg]
    usertypeorg(_id: String): UserTypeOrg
`;

const UserTypeOrgMutation = `
    createUserTypeOrg(
        usertype: String,
        organization: String
) : UserTypeOrg
`;

const UserTypeOrgQueryResolver = {
    allUserTypeOrgs: async (parent, args, {UserTypeOrg}) => {
        let usertypes = await UserTypeOrg.find({});
        return usertypes.map(usertype => {
            usertype._id = usertype._id.toString();
            return usertype
        })
    },
    organization: async (parent, args, {UserTypeOrg}) => {
        return await UserTypeOrg.findById(args._id.toString())
    },
};

const UserTypeOrgNested = {
    users: async ({users}) => {
        return (await User.find({users: _id}))
    },
    organization: async ({organization}) => {
        return (await Organization.find({organization: _id}))
    },
};

const UserTypeOrgMutationResolver ={
    createUserTypeOrg: async (parent, args, { UserTypeOrg}) => {
        let usertype = await new UserTypeOrg(args).save();
        return usertype
    }
};

export {UserTypeOrgType, UserTypeOrgMutation, UserTypeOrgQuery, UserTypeOrgQueryResolver, UserTypeOrgNested, UserTypeOrgMutationResolver};
