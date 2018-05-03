import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";

const PriorityType = `
    type Priority {
        _id: String
        priority: String
        task: [Task]
        group: [Group]
        project: [Project]
    }
`;

const PriorityQuery = `
    allPriorities: [Priority]
    priority(_id: String): Priority
`;

const PriorityMutation = `
    createPriority(
        priority: String
) : Priority
`;

const PriorityQueryResolver = {
    allPriorities: async (parent, args, {Priority}) => {
        const priorities = await Priority.find({});
        return priorities.map(priority => {
            priority._id = priority._id.toString();
            return priority
        })
    },
    priority: async (parent, args, {Priority}) => {
        return await Priority.findById(args._id.toString())
    },
};

const PriorityMutationResolver ={
    createPriority: async (parent, args, { Priority}) => {
        let priority = await new Priority(args).save();
        return priority
    }
};

const PriorityNested = {
    task: async ({task}) => {
        return (await Task.find({task: _id}))
    },
    group: async ({group}) => {
        return (await Group.find({group: _id}))
    },
    project: async ({project}) => {
        return (await Project.find({project: _id}))
    },
};

export {PriorityType, PriorityMutation, PriorityQuery, PriorityQueryResolver, PriorityNested, PriorityMutationResolver};
