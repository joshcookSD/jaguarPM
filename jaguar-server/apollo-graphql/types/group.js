import Task from "../../models/task";
import User from "../../models/user";
import Time from "../../models/time";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";

const GroupType = `
    type Group {
        _id: String
        grouptitle: String
        groupdescription: String
        task: [Task]
        users: [User]
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
    task: async ({task}) => {
        return (await Task.find({task: _id}))
    },
    users: async ({users}) => {
        return (await User.find({users: _id}))
    },
    grouptime: async ({grouptime}) => {
        return (await Time.find({grouptime: _id}))
    },
    groupplannedtime: async ({groupplannedtime}) => {
        return (await PlannedTime.find({groupplannedtime: _id}))
    },
    priority: async ({priority}) => {
        return (await Priority.find({priority: _id}))
    },
};

export {GroupType, GroupMutation, GroupQuery, GroupQueryResolver, GroupNested, GroupMutationResolver};
