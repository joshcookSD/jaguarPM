import Task from "../../models/task";
import User from "../../models/user";
import Time from "../../models/time";
import Project from "../../models/project";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";
import Team from "../../models/team";
import Comment from "../../models/comment";

const GroupType = `
    type Group {
        _id: String
        grouptitle: String
        groupdescription: String
        iscompleted: Boolean
        project: Project
        team: Team
        tasks: [Task]
        users: [User]
        comments: [Comment]
        grouptime: [Time]
        groupplannedtime: [PlannedTime]
        plannedcompletiondate: Date
        duedate: Date
        priority: Priority
    }
    type CreateGroupResponse {
        ok: Boolean!
        group: Group
        errors: [Error!]
    }
`;

const GroupQuery = `
    allGroups: [Group]
    group(_id: String): Group
`;

const GroupMutation = `
    createGroup(
        grouptitle: String,
        groupdescription: String,
        project: String,
        team: String,
        users: String
    ) : CreateGroupResponse
    updateGroup(
        _id: String
        grouptitle: String
        groupdescription: String
        plannedcompletiondate: Date
        iscompleted: Boolean
        duedate: Date
        targetProject : String
        groupToChange : String
        groupUsers : String
        groupTeam : String
        groupProject : String
        groupsProjectTeam : String
        groupUser: String
    ) : Group
     addGroupUser(
        _id: String,
        user: String,
    ) : Group
    completeGroup(
        _id: String!
        iscompleted: Boolean
    ) : Group
`;

const GroupQueryResolver = {
    allGroups: async (parent, args, {Group}) => {
        const groups = await Group.find({});
        return groups.map(group => {
            group._id = group._id.toString();
            return group
        })
    },
    group: async (parent, args, {Group}) => {

        return await Group.findById(args._id.toString())
    },
};

    const GroupMutationResolver ={
        completeGroup: async (parent, args, {Group}) =>{
            let project = await Project.findByIdAndUpdate(
                args._id,
                {$set: {iscompleted: args.iscompleted}
                }
            );
        },
        createGroup: async (parent, args, { Group}) => {
            let group = await new Group(args).save();

            if (args.team) {
                let groupTeam = await Team.findById(args.team);
                groupTeam.groups.push(group._id);
                await groupTeam.save();
            }

            let user = await User.findById(args.users);
            user.groups.push(group._id);

            let project = await Project.findById(args.project);
            project.groups.push(group._id);

            await user.save();
            await project.save();
            return {
                ok: true,
                group
            };
        },
        updateGroup: async (parent, args, { Group}) => {
            console.log(args)
        if (args.tasks) {
                await Group.findByIdAndUpdate(args.yargetproject)
        }
        if (args.groupProject) {
            await Project.findByIdAndUpdate(args.groupProject, {
                    $pull: {
                        groups: args.groupToChange
                    },
                },
                {new: true}
            );
        }
        if (args.targetProject) {
            await Project.findByIdAndUpdate(args.targetProject, {
                    $push: {
                        groups: args.groupToChange
                    },
                },
                {new: true}
            );
        }
        if (args.groupToChange) {
            await Group.findByIdAndUpdate(args.groupToChange, {
                    $set: {
                        project: args.targetProject
                    },
                },
                {new: true}
            );
        }
        if (args.grouptitle) {
            await Group.findByIdAndUpdate(args._id, {
                    $set: {
                        grouptitle: args.grouptitle
                    }
                },
                {new: true}
            );
        }
        if (args.groupdescription) {
            await Group.findByIdAndUpdate(args._id, {
                    $set: {
                        groupdescription: args.groupdescription
                    }
                },
                {new: true}
            );
        }
        if (args.plannedcompletiondate != 'Invalid Date') {
            await Group.findByIdAndUpdate(args._id, {
                    $set: {
                        plannedcompletiondate: args.plannedcompletiondate
                    }
                },
                {new: true}
            );
        }
        if (args.duedate != 'Invalid Date') {
            await Group.findByIdAndUpdate(args._id, {
                    $set: {
                        duedate: args.duedate
                    }
                },
                {new: true}
            );
        }
        if (args.iscompleted != null) {
            await Group.findByIdAndUpdate(args._id, {
                    $set: {
                        iscompleted: args.iscompleted
                    }
                },
                {new: true}
            );
        }
    },
        addGroupUser: async (parent, {_id, user}, {Group}) => {
            //find user by id with "user id"
            let groupuser = await User.findById(user);
            //find group by id with arg.id
            let groups = await Group.findById(_id);
            groupuser.groups.push(groups._id);
            await groupuser.save();
            groups.users.push(groupuser._id);
            await groups.save();
            return groups
        }
    };
const GroupNested = {
    comments: async ({_id}) => {
        return (await Comment.find({group: _id}))
    },
    project: async ({project}) => {
        return (await Project.findById(project))
    },
    team: async ({team}) => {
        return (await Team.findById(team))
    },
    tasks: async ({_id}) => {
        return (await Task.find({group: _id}))
    },
    users: async ({_id}) => {
        return (await User.find({groups: _id}))
    },
    grouptime: async ({_id}) => {
        return (await Time.find({group: _id}))
    },
    groupplannedtime: async ({_id}) => {
        return (await PlannedTime.find({group: _id}))
    },
    priority: async ({priority}) => {
        return (await Priority.findById({priority}))
    },
};

export {GroupType, GroupMutation, GroupQuery, GroupQueryResolver, GroupNested, GroupMutationResolver};
