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
`;

const GroupQuery = `
    allGroups: [Group]
    group(_id: String): Group
`;

const GroupMutation = `
    createGroup(
        grouptitle: String,
        groupdescription: String
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
    createGroup: async (parent, args, { Group}) => {
        let group = await new Group(args).save();
        return group
    }
};

const GroupNested = {
    comments: async ({_id}) => {
        return (await Comment.find({group: _id}))
    },
    project: async ({project}) => {
        return (await Project.findById({project}))
    },
    team: async ({team}) => {
        return (await Team.findById({team}))
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
