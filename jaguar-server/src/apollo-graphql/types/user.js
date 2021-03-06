import Time from '../../models/time';
import Task from '../../models/task';
import PlannedTime from '../../models/plannedtime';
import UserTypeOrg from '../../models/usertypeorg';
import Organization from '../../models/organization';
import Team from '../../models/team';
import Comment from '../../models/comment';
import Project from '../../models/project';
import Group from '../../models/group';
require("dotenv").load();
import bcrypt from 'bcrypt';
import { tryLogin, refreshLogin } from '../auth';
import {emailError, usernameError, passwordError} from '../formatErrors';
import {SECRET, SECRET2} from "../../server";
import User from "../../models/user";

const UserType = `
        type User {
        _id: String 
        email: String
        username: String
        password: String
        profileImageUrl: String
        tasks: [Task]
        currenttask: Task
        comments: [Comment]
        time: [Time]
        plannedtime: [PlannedTime]
        usertypeorg: [UserTypeOrg]
        team: [Team]
        defaultteam: Team
        projects: [Project]
        defaultproject: Project
        groups: [Group]
        defaultgroup: Group
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
    updateCurrentTask(
        _id: String
        currenttask: String
        previoustask: String
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
    updatePassword(
        email: String!, 
        newPassword: String!,
        username: String!
    ) : LoginResponse! 
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
        return await User.findById(args._id)
    },
    userEmail: async (parent, args, {User}) => {
        return await User.findOne(args)
    },
};

const UserNested =  {
    tasks: async ({_id}) => {
        return (await Task.find({taskcurrentowner: _id}))
    },
    currenttask: async ({currenttask}) => {
        return await Task.findById(currenttask)
    },
    comments: async ({_id}) => {
        return (await Comment.find({user: _id}))
    },
    time: async ({_id}) => {
        return (await Time.find({user: _id}))
    },
    defaultproject: async ({defaultproject}) => {
        return await Project.findById(defaultproject)
    },
    projects: async ({_id}) => {
        return (await Project.find({users: _id}))
    },
    defaultgroup: async ({defaultgroup}) => {
        return await Group.findById(defaultgroup)
    },
    groups: async ({_id}) => {
        return (await Group.find({users: _id}))
    },
    plannedtime: async ({_id}) => {
        return (await PlannedTime.find({user: _id}))
    },
    usertypeorg: async ({_id}) => {
        return (await UserTypeOrg.find({user: _id}))
    },
    organization: async ({_id}) => {
        return (await Organization.find({users: _id}))
    },
    defaultteam: async ({defaultteam}) => {
        return await Team.findById(defaultteam)
    },
    team: async ({_id}) => {
        return (await Team.find({users: _id}))
    }
};

const UserMutationResolver = {
    updateUser: async (parent, args,{User}, info) => {
        let user = await User.findByIdAndUpdate(args._id.toString(),);
        user._id = user._id.toString();
        return user
    },
    updatePassword: async (parent, args,{User}, info) => {
        let user = await User.find({email: args.email});
        if(user[0].username === args.username){
            let newHash = await bcrypt.hash(args.newPassword, 10);
            await User.findByIdAndUpdate(user[0]._id, {
                    $set: {
                        password: newHash,
                    }
                },
                {new: true}

            );
            return {
                ok: true
            }
        }else{
            return {
                ok: false
            }
        }
    },
    updateCurrentTask: async (parent, {_id, currenttask, previoustask},{User}) => {
        let task = await Task.findByIdAndUpdate(currenttask, {
                $set: {
                    iscurrent: true,
                }},
            {new: true}
        );
        let taskUser = await User.findByIdAndUpdate(_id, {
                $set: {
                    currenttask: task,
                }},
            {new: true}
        );
        await Task.findByIdAndUpdate(currenttask, {
                $set: {
                    taskcurrentowner: taskUser,
                }},
            {new: true}
        );
        if(previoustask) {
            await Task.findByIdAndUpdate(previoustask, {
                    $set: {
                        iscurrent: false,
                    }
                },
                {new: true}
            );
        }
        return taskUser
    },
    login: (parent, { email, password }, {SECRET, SECRET2 }) =>
        tryLogin(email, password, SECRET, SECRET2),
    refreshUser: (parent, { token }, {SECRET}) =>
        refreshLogin(token, SECRET),
    signup: async (_, {email, password, username } , {SECRET, SECRET2, User}) => {
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
                const personalOrg = await new Organization({
                    orgtitle: `${user.username}'s Org`,
                    orgdescription: `Personal Team for ${user.username}`,
                    users: user._id,
                    owner: user._id
                }).save();
                const personalteam = await new Team({
                    teamtitle: `${user.username}'s Team`,
                    teamdescription: `Personal Team for ${user.username}`,
                    users: user._id,
                    owner: user._id,
                    organization: personalOrg._id
                }).save();
                const personalproject = await new Project({
                    projecttitle: `${user.username}'s Project`,
                    projectdescription: `Personal Project for ${user.username}`,
                    users: user._id,
                    leader: user._id,
                    team: personalteam._id
                }).save();
                const personalgroup = await new Group({
                    grouptitle: `General`,
                    groupdescription: `General Group`,
                    users: user._id,
                    team: personalteam._id,
                    project: personalproject._id
                }).save();
                //user
                user.groups.push(personalgroup._id);
                user.projects.push(personalproject._id);
                user.team.push(personalteam._id);
                user.organization.push(personalOrg._id);
                await user.save();
                //organization
                personalOrg.team.push(personalteam._id);
                // personalOrg.project.push(personalproject._id);
                await personalOrg.save();

                personalproject.groups.push(personalgroup._id);
                await personalproject.save();

                personalteam.groups.push(personalgroup._id);
                personalteam.projects.push(personalproject._id);
                await personalteam.save();


                await User.findByIdAndUpdate(user._id, {
                        $set: {
                            defaultgroup: personalgroup._id,
                            defaultproject: personalproject._id,
                            defaultteam: personalteam._id
                        }
                    },
                    {new: true}
                );
                await Team.findByIdAndUpdate(personalteam._id, {
                        $set: {
                            defaultproject: personalproject._id,
                            organization: personalOrg._id
                        }
                    },
                    {new: true}
                );
                await Project.findByIdAndUpdate(personalproject._id, {
                        $set: {
                            defaultgroup: personalgroup._id,
                        }
                    },
                    {new: true}
                );
                return tryLogin(email, password, SECRET, SECRET2)
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