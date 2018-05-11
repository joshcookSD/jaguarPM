import User from "../../models/user";
import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";

const PlannedTimeType = `
    type PlannedTime {
        _id: String
        time: Float
        date: Date
        user: User
        task: Task
        group: Group
        project: Project        
    }
`;

const PlannedTimeQuery = `
    allPlannedTime: [PlannedTime]
    plannedtime(_id: String): PlannedTime
`;

const PlannedTimeMutation = `
    createPlannedTime(
         _id: String
        time: Float
        date: Date
        user: String
        task: String
        group: String
        project: String  
) : PlannedTime
`;

const PlannedTimeQueryResolver = {
    allPlannedTime: async (parent, args, {PlannedTime}) => {
        let time = await PlannedTime.find({});
        return time.map(t => {
            t._id = t._id.toString();
            return t
        })
    },
    plannedtime: async (parent, args, {PlannedTime}) => {
        return await PlannedTime.findById(args._id.toString())
    }
};

const PlannedTimeNested = {
    task: async ({_id}) => {
        return (await Task.find({plannedtime: _id}))
    },
    user: async ({_id}) => {
        return (await User.find({plannedtime: _id}))
    },
    group: async ({_id}) => {
        return (await Group.find({plannedtime: _id}))
    },
    project: async ({_id}) => {
        return (await Project.find({plannedtime: _id}))
    },
};

const PlannedTimeMutationResolver ={
    createPlannedTime: async (parent, args, { PlannedTime, Task, User }) => {
        let plan = await new PlannedTime(args).save();
        let user = await User.findById(args.user);
        user.plannedtime.push(plan._id);
        await user.save();
        let task = await Task.findById(args.task);
        task.plannedtime.push(plan._id);
        await task.save();
        return plan
    }
};

export {PlannedTimeType, PlannedTimeQuery, PlannedTimeMutation, PlannedTimeQueryResolver, PlannedTimeNested, PlannedTimeMutationResolver};
