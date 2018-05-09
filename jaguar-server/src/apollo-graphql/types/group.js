import Task from "../../models/task";
import User from "../../models/user";
import Time from "../../models/time";
import Project from "../../models/project";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";

const GroupType = `
    type Group {
        _id: String
        grouptitle: String
        groupdescription: String
        project: Project
        task: [Task]
        users: [User]
        comments: [Comment]
        grouptime: [Time]
        groupplannedtime: [PlannedTime]
        plannedcompletiondate: String
        duedate: String
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
    comments: async ({comment}) => {
        return (await Comment.find({group: comment}))
    },
    project: async ({project}) => {
        return (await Project.findById({project}))
    },
    task: async ({task}) => {
        return (await Task.find({task: task}))
    },
    users: async ({users}) => {
        return (await User.find({users}))
    },
    grouptime: async ({time}) => {
        return (await Time.find({time}))
    },
    groupplannedtime: async ({groupplannedtime}) => {
        return (await PlannedTime.find({groupplannedtime}))
    },
    priority: async ({priority}) => {
        return (await Priority.find({priority}))
    },
};

export {GroupType, GroupMutation, GroupQuery, GroupQueryResolver, GroupNested, GroupMutationResolver};
