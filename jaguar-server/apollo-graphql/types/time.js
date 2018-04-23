import User from "../../models/user";
import Task from "../../models/task";

const TimeType = `
    type Time {
        _id: String
        time: Float
        date: String
        comment: String
        user: User
        task: Task
    }
`;

const TimeQuery = `
    allTime: [Time]
    time(_id: String): Time
`;

const TimeMutation = `
    createTimeTask(
        time: Float
        comment: String
        date: String
        user: String
        task: String
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
    }
};

const TimeNested = {
    task: async ({task}) => {
        return (await Task.findById(task))
    },
    user: async ({user}) => {
        return (await User.findById(user))
    },
};

const TimeMutationResolver ={
    createTimeTask: async (parent, {time, comment, date, task, user}, { Time, Task, User }) => {
        let newtime = await new Time({time, comment, user, task, date}).save();
        let usertime = await User.findById(user);
        console.log(usertime);
        usertime.time.push(newtime._id);
        await usertime.save();
        let task_time = await Task.findById(task);
        console.log(task_time);
        task_time.tasktime.push(newtime._id);
        await task_time.save();
        return newtime
    }
};

export {TimeType, TimeQuery, TimeMutation, TimeQueryResolver, TimeNested, TimeMutationResolver};


