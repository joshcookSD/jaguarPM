import User from "../../models/user";
import Time from "../../models/time";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";
import Group from "../../models/group";
import Team from "../../models/team";
import Organization from "../../models/organization";

const TaskType = `
    type Task {
        _id: String
        tasktitle: String
        taskdescription: String
        iscompleted: Boolean
        completeddate: Date
        plandate: Date
        taskstatus: String
        comments: [Comment]
        taskcurrentowner: User
        taskpriorowners: [User]
        tasktime: [Time]
        taskplannedtime: [PlannedTime]
        plannedcompletiondate: String
        duedate: Date
        priority: Priority
        group: Group
        team: Team
        organization: Organization,
        updatedAt: Date,
        createdAt: Date
    }
`;

const TaskQuery = `
    allTasks: [Task]
    task(_id: String): Task
    tasksByUser(taskcurrentowner: String, iscompleted: Boolean): [Task]
    tasksByDay(taskcurrentowner: String, iscompleted: Boolean, plandate: Date): [Task]
    tasksToday(taskcurrentowner: String, iscompleted: Boolean, plandate: Date): [Task]
    tasksByTeam(taskcurrentowner: String, iscompleted: Boolean, team: String): [Task]
`;

const TaskMutation = `
    createTask(
        tasktitle: String,
        taskdescription: String,
        taskcurrentowner: String,
        plandate: Date,
        iscompleted: Boolean,
        team: String
) : Task
    updateTask(
        _id: String,
        tasktitle: String,
        taskdescription: String,
        taskstatus: String,
        duedate: Date,
        priority: String,
        group: String,
        team: String,
        taskcurrentowner: String,
        plandate: Date,
        iscompleted: Boolean,
        completeddate: Date
) : Task
    completeTask(
        _id: String!
        iscompleted: Boolean
        completeddate: Date
) : Task
    removeTask(
        _id: String!
) : Task
`;

const TaskQueryResolver = {
    allTasks: async (parent, args, {Task}) => {
        const tasks = await Task.find({});
        return tasks.map(task => {
            task._id = task._id.toString();
            return task
        })
    },
    task: async (parent, args, {Task}) => {
        return await Task.findById(args._id.toString())
    },
    tasksByUser: async (parent, args, {Task}) => {
        const owner = await User.findById(args.taskcurrentowner.toString());
        return await Task.find({taskcurrentowner: owner, iscompleted: args.iscompleted, plandate: null})
    },
    tasksByDay: async (parent, args, {Task}) => {
        const owner = await User.findById(args.taskcurrentowner.toString());
        return await Task.find({taskcurrentowner: owner, iscompleted: args.iscompleted, plandate: new Date(args.plandate)})
    },
    tasksToday: async (parent, args, {Task}) => {
        const owner = await User.findById(args.taskcurrentowner.toString());
        return await Task.find({taskcurrentowner: owner, iscompleted: args.iscompleted, plandate: {$lte: new Date(args.plandate)}})
    },
    tasksByTeam: async (parent, args, {Task}) => {
        const teams = await Team.findById(args.team.toString());
        return await Task.find({taskcurrentowner: null, iscompleted: args.iscompleted, team: teams})
    },
};

const TaskNested = {
    comments: async ({_id}) => {
        return await Comment.find({task: _id})
    },
    taskcurrentowner: async ({taskcurrentowner}) => {
        return await User.findById(taskcurrentowner)
    },
    tasktime: async ({_id}) => {
        return (await Time.find({task: _id}))
    },
    taskplannedtime: async ({_id}) => {
        return (await PlannedTime.find({task: _id}))
    },
    priority: async ({priority}) => {
        return (await Priority.findById(priority))
    },
    group: async ({group}) => {
        return (await Group.findById(group))
    },
    team: async ({team}) => {
        return (await Team.findById(team))
    },
    organization: async ({_id}) => {
        return (await Organization.find({task: _id}))
    },
};

const TaskMutationResolver ={
    createTask: async (parent, args, { Task, User, Team }) => {
        let task = await new Task(args).save();
        if(args.taskcurrentowner) {
            let owner = await User.findById(args.taskcurrentowner);
            owner.tasks.push(task._id);
            await owner.save();
        }

        if(args.team) {
            let teamTask = await Team.findById(args.team);
            teamTask.tasks.push(task._id);
            await teamTask.save();
        }
        return task
    },
    updateTask: async (parent, args, { Task, User }) => {
        let task = await Task.findByIdAndUpdate(args._id, {
            $set: {
                tasktitle: args.tasktitle,
                taskdescription: args.taskdescription,
                }},
            {new: true}
        );
        if(args.plandate != 'Invalid Date') {
            await Task.findByIdAndUpdate(args._id, {
                    $set: {
                        plandate: args.plandate}},
                {new: true}
            );
        }
        if(args.duedate != 'Invalid Date') {
            await Task.findByIdAndUpdate(args._id, {
                    $set: {
                        duedate: args.duedate}},
                {new: true}
            );
        }
        if(args.taskcurrentowner) {
            let owner = await User.findById(args.taskcurrentowner);
            await task.taskcurrentowner.save(owner._id);
            owner.tasks.push(task._id);
            await owner.save();
        }

        if(args.team) {
            let taskteam = await Team.findById(args.team);
            await task.team.save(taskteam._id);
            taskteam.tasks.push(task._id);
            await taskteam.save();
        }

        if(args.group) {
            let taskgroup = await Group.findById(args.group);
            await task.group.save(taskgroup._id);
            taskgroup.tasks.push(task._id);
            await taskgroup.save();
        }

        if(args.priority) {
            let taskpriority = await Priority.findById(args.priority);
            await task.priority.save(taskpriority._id);
            taskpriority.tasks.push(task._id);
            await taskpriority.save();
        }

        return task
    },
    completeTask: async (parent, args, {Task}) =>{
        let task = await Task.findByIdAndUpdate(
            args._id,
            {$set: {iscompleted: args.iscompleted
                    , completeddate: args.completeddate}}, function (err, task){
                if(err) return err;
                return task;
            });
    },
    removeTask: async (parent, args, {Task}) =>{
         await Task.remove({_id: args._id});
    }
}; 

export {TaskType, TaskMutation, TaskQuery, TaskQueryResolver, TaskNested, TaskMutationResolver};
