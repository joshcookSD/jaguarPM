import Time from '../../models/time';
import Task from '../../models/task';
import PlannedTime from '../../models/plannedtime';
import UserTypeOrg from '../../models/usertypeorg';
import Organization from '../../models/organization';
import Team from '../../models/team';
require("dotenv").load();
import bcrypt from 'bcrypt';
import { tryLogin, refreshLogin } from '../auth';
import {emailError, usernameError, passwordError} from '../formatErrors';
import {SECRET, SECRET2} from "../../server";

const UserType = `
        type User {
        _id: String 
        email: String
        username: String
        password: String
        profileImageUrl: String
        tasks: [Task]
        time: [Time]
        plannedtime: [PlannedTime]
        usertypeorg: [UserTypeOrg]
        team: [Team]
        organization: [Organization]
        jwt: String
    }
    
        type LoginResponse {
            ok: Boolean!
            token: String
            refreshToken: String
            user: User
            errors: [Error!]
        }
        type Error {
            path: String!
            message: String 
        }
        type RegisterResponse {
            ok: Boolean!
            token: String
            refreshToken: String
            user: User
            errors: [Error!] 
        }
`;

const UserQuery =`
  allUsers: [User]
  user(_id: String): User
  userEmail(email: String): User
`;

const UserMutation = `
    updateUser(
        usertypeorg: String
        organization: String
        profileImageUrl: String
        username: String
    ) : User
    login(
        email: String!, 
        password: String!
    ): LoginResponse!
    refreshUser(
        token: String!
    ): LoginResponse!
    signup(
        email: String!, 
        password: String!, 
        username: String!
        ): RegisterResponse
`;

const UserQueryResolver = {
    allUsers: async (parent, args, {User}) => {
        const users = await User.find({});
        return users.map(user => {
            user._id = user._id.toString();
            return user
        })
    },
    user: async (parent, args, {User}) => {
        return await User.findById(args._id.toString())
    },
    userEmail: async (parent, args, {User}) => {
        return await User.findOne(args)
    },

};

const UserNested =  {
    tasks: async ({_id}) => {
        return (await Task.find({taskcurrentowner: _id}))
    },
    time: async ({_id}) => {
        return (await Time.find({user: _id}))
    },
    plannedtime: async ({_id}) => {
        return (await PlannedTime.find({user: _id}))
    },
    usertypeorg: async ({_id}) => {
        return (await UserTypeOrg.find({user: _id}))
    },
    organization: async ({_id}) => {
        return (await Organization.find({user: _id}))
    },
    team: async ({_id}) => {
        return (await Team.find({team: _id}))
    }
};

const UserMutationResolver = {
    updateUser: async (parent, args,{User}, info) => {
        let user = await User.findByIdAndUpdate(args._id.toString(),);
        user._id = user._id.toString();
        return user
    },
    login: (parent, { email, password }, {SECRET, SECRET2 }) =>
        tryLogin(email, password, SECRET, SECRET2),
    refreshUser: (parent, { token }, {SECRET}) =>
        refreshLogin(token, SECRET),
    signup: async (_, { email, password, username, SECRET, SECRET2 }, {User}) => {
        try {
            const err = [];
            let emailErr = await emailError(email);
            let passwordErr = await passwordError(password);
            let usernameErr = await usernameError(username);
            if(emailErr) { err.push(emailErr)}
            if(passwordErr) { err.push(passwordErr)}
            if(usernameErr) { err.push(usernameErr)}

            if(!err.length) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                return {
                    ok: true,
                    user,
                };
            } else {
                return {
                    ok: false,
                    errors: err,
                }
            }
        } catch (e) {
            console.log(e.errors);
            return {
                ok: false,
                errors: [{path: 'Signup', message: 'something did not go well'}]
            }
        }
    },
};
export {UserType, UserMutation, UserQuery, UserMutationResolver, UserQueryResolver, UserNested};