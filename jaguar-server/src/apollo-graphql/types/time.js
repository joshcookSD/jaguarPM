import User from "../../models/user";
import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";

const TimeType = `
    type Time {
        _id: String
        time: Float
        date: Date
        timecomment: String
        user: User
        task: Task
        group: Group
        project: Project
    }
`;

const TimeQuery = `
    allTime: [Time]
    time(_id: String): Time
    timeByUser(user: String): [Time]
`;

const TimeMutation = `
    createTimeTask(
        time: Float
        timecomment: String
        date: Date
        user: String
        task: String
        group: String
        project: String
) : Time
`;

const TimeQueryResolver = {
    allTime: async (parent, args, {Time}) => {
        let time = await Time.find({});
        return time.map(t => {
            t._id = t._id.toString();
            return t
        })
    },
    time: async (parent, args, {Time}) => {
        return await Time.findById(args._id.toString())
    },
    timeByUser: async (parent, args, {Time}) => {
        const user = await User.findById(args.user.toString());
        console.log(user);
        return await Time.find({user})
    },
};

const TimeNested = {
    task: async ({task}) => {
        return (await Task.findById(task))
    },
    user: async ({user}) => {
        return await User.findById(user)
    },
    group: async ({group}) => {
        return (await Group.findById(group))
    },
    project: async ({project}) => {
        return (await Project.findById(project))
    },
};

const TimeMutationResolver ={
    createTimeTask: async (parent, {time, timecomment, date, task, group, project, user}, { Time, Task, User }) => {
        let newtime = await new Time({time, timecomment, user, task, group, project, date}).save();
        let usertime = await User.findById(user);
        let grouptime = await Group.findById(group);
        let projecttime = await Project.findById(project);
        usertime.time.push(newtime._id);
        grouptime.grouptime.push(newtime._id);
        projecttime.projecttime.push(newtime._id);
        await usertime.save();
        await grouptime.save();
        await projecttime.save();
        let task_time = await Task.findById(task);
        task_time.tasktime.push(newtime._id);
        await task_time.save();
        return newtime
    }
};

export {TimeType, TimeQuery, TimeMutation, TimeQueryResolver, TimeNested, TimeMutationResolver};


