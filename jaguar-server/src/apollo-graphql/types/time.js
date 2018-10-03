import User from "../../models/user";
import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";
import Team from "../../models/team";
import PlannedTime from "../../models/plannedtime";
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
        team: Team
    }
`;
const TimeQuery = `
    allTime: [Time]
    time(_id: String): Time
    timeByUser(user: String): [Time]
    timeByProject(project: String): [Time]
    timeByGroup(group: String): [Time]
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
    team: String
) : Time
createProjectTime(
    time: Float
    timecomment: String
    date: Date
    user: String
    project: String
) : Time
createGroupTime(
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
        return await Time.find({user})
    },
    timeByProject: async (parent, args, {Time}) => {
        return await Time.find({ project: args.project.toString() })
    },
    timeByGroup: async (parent, args, {Time}) => {
        return await Time.find({ group: args.group.toString() })
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
    team: async ({team}) => {
        return (await Team.findById(team))
    },
};

const TimeMutationResolver ={
    createTimeTask: async (parent, {time, timecomment, date, task, group, project, team, user}, { Time, Task, User }) => {
        let newtime = await new Time({time, timecomment, user, task, group, project, team, date}).save();
        let usertime = await User.findById(user);
        let projecttime = await Project.findById(project);
        let teamtime = await Team.findById(team);

        usertime.time.push(newtime._id);
        projecttime.projecttime.push(newtime._id);
        teamtime.teamtime.push(newtime._id);

        await usertime.save();
        await projecttime.save();
        await teamtime.save();
        if(task) {
            let task_time = await Task.findById(task);
            task_time.tasktime.push(newtime._id);
            await task_time.save();
        }

        return newtime
    },
    createGroupTime: async (parent, {time, timecomment, date, group, user, task}, { Time, Task, User }) => {
        if(task){
            let newtime = await new Time({time, timecomment, user, date, task}).save();
            let usertime = await User.findById(user);
            let taskTarget = await Task.findById(task);

            taskTarget.tasktime.push(newtime._id);
            usertime.time.push(newtime._id);

            await taskTarget.save();
            await usertime.save();

            return newtime
        }else{
            let newtime = await new Time({time, timecomment, user, group, date}).save();
            let usertime = await User.findById(user);
            let grouptime = await Group.findById(group);

            usertime.time.push(newtime._id);
            grouptime.grouptime.push(newtime._id);

            await usertime.save();
            await grouptime.save();

            return newtime
        }
    },
    createProjectTime:  async (parent, {time, timecomment, date, project, user}, { Time, Project, User }) => {
        console.log(time, timecomment, date, project, user)
        let newtime = await new Time({time, timecomment, user, project, date}).save();
        let usertime = await User.findById(user);
        let projecttime = await Project.findById(project);

        usertime.time.push(newtime._id);
        projecttime.projecttime.push(newtime._id);

        await usertime.save();
        await projecttime.save();

        return newtime
    }
};

export {TimeType, TimeQuery, TimeMutation, TimeQueryResolver, TimeNested, TimeMutationResolver};


