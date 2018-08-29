import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";
import User from "../../models/user";

const PlannedTimeType = `
    type PlannedTime {
        _id: String
        time: Float
        createdBy: User
        date: Date
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
        time: Float!
        date: Date
        createdBy: String
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
    task: async ({task}) => {
        return (await Task.findById(task))
    },
    group: async ({group}) => {
        return (await Group.findById(group))
    },
    project: async ({project}) => {
        return (await Project.findById(project))
    },
    createdBy: async ({createdBy}) => {
        return (await User.findById(createdBy))
    },
};

const PlannedTimeMutationResolver ={
    createPlannedTime: async (parent, args, { PlannedTime, Task}) => {
        let plan = await new PlannedTime(args).save();
        if(args.task) {
            let task = await Task.findById(args.task);
            task.taskplannedtime.push(plan._id);
            await task.save();
        }
        if(args.group) {
            let group = await Group.findById(args.group);
            group.groupplannedtime.push(plan._id);
            await group.save();
        }
        if(args.project) {
            let project = await Project.findById(args.project);
            project.projectplannedtime.push(plan._id);
            await project.save();
        }
        return plan
    }
};

export {PlannedTimeType, PlannedTimeQuery, PlannedTimeMutation, PlannedTimeQueryResolver, PlannedTimeNested, PlannedTimeMutationResolver};
