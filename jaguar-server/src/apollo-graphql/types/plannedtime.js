import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";
import User from "../../models/user";
import Requirement from "../../models/requirement";
import PlannedTime from "../../models/plannedtime.js";

const PlannedTimeType = `
    type PlannedTime {
        _id: String
        time: Float
        createdBy: User
        date: Date
        task: Task
        group: Group
        project: Project  
        requirement: Requirement      
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
        userId : String
) : PlannedTime
    createPlannedTimeGroup(
        time: Float!
        date: Date
        createdBy: String
        group: String
        task: String 
        user: String
        project: String
) : Time
    createPlannedTimeRequirement(
        time: Float!
        date: Date
        createdBy: String
        user: String
        requirement: String
        project: String
) : Time
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
    requirement: async ({requirement}) => {
        return (await Requirement.findById(requirement))
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
        if(args.createdBy) {
            let user = await User.findById(args.createdBy);
            user.plannedtime.push(plan._id);
            await user.save();
        }
        return plan
    },
    createPlannedTimeGroup : async (parent, {time, date, group,  task, user, project}, { PlannedTime, Task, User }) => {
        if(task){
            let plan = await new PlannedTime({time, user, date, task, group, project}).save();

                let newTask = await Task.findById(task);
                newTask.taskplannedtime.push(plan._id);
                await newTask.save();

            if(group) {
                let newGroup = await Group.findById(group);
                newGroup.groupplannedtime.push(plan._id);
                await newGroup.save();
            }
            if(project) {
                let newProject = await Project.findById(project);
                newProject.projectplannedtime.push(plan._id);
                await newProject.save();
            }
            if(user) {
                let newUser = await User.findById(user);
                newUser.plannedtime.push(plan._id);
                await newUser.save();
            }
            return plan
        }else{
            let newtime = await new PlannedTime({time, user, group, date, project}).save();
            let usertime = await User.findById(user);
            let grouptime = await Group.findById(group);
            console.log(grouptime);
            usertime.plannedtime.push(newtime._id);
            grouptime.groupplannedtime.push(newtime._id);

            await usertime.save();
            await grouptime.save();

            return newtime
        }
    },
    createPlannedTimeRequirement: async (parent, args, { PlannedTime, Requirement }) => {
        let plan = await new PlannedTime(args).save();

        if(args.requirement){
            await Requirement.findByIdAndUpdate(args.requirement, {
                    $push: {
                        requirementplannedtime: plan._id
                    }
                },
                {upsert: true}
            );
        }
    },
};

export {PlannedTimeType, PlannedTimeQuery, PlannedTimeMutation, PlannedTimeQueryResolver, PlannedTimeNested, PlannedTimeMutationResolver, };
