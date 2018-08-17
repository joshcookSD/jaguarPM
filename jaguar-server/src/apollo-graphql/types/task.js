import User from "../../models/user";
import Time from "../../models/time";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";
import Group from "../../models/group";
import Project from "../../models/project";
import Team from "../../models/team";
import Organization from "../../models/organization";
import Comment from "../../models/comment";

const TaskType = `
    type Task {
        _id: String
        tasktitle: String
        taskdescription: String
        iscompleted: Boolean
        iscurrent: Boolean
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
        project: Project
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
    tasksUnplanned(taskcurrentowner: String, iscompleted: Boolean): [Task]
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
        dueDate: Date,
        iscompleted: Boolean,
        group: String,
        project: String,
        team: String
) : Task
    updateTask(
        _id: String,
        taskcurrentowner: String,
        tasktitle: String,
        taskdescription: String,
        taskstatus: String,
        duedate: Date,
        priority: String,
        plandate: Date,
        iscompleted: Boolean,
        completeddate: Date
        taskGroupId: String
) : Task
    updateTaskTeam(
        _id: String,
        team: String,
        project: String,
        group: String,
) : Task
    updateTaskProject(
        _id: String,
        project: String,
        group: String,
) : Task
    updateTaskGroup(
        _id: String,
        group: String,
) : Task
    updateTaskUser(
        _id: String,
        taskcurrentowner: String,
) : Task
    completeTask(
        _id: String!
        iscompleted: Boolean
        completeddate: Date
        groupForTasksId: String!
) : Task
    removeTask(
        _id: String!
) : Task
    createTaskByGroup(
        tasktitle: String,
        taskdescription: String,
        iscompleted: Boolean,
        team: String,
        project: String,
        group: String,
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
        return await Task.find({taskcurrentowner: owner})
    },
    tasksUnplanned: async (parent, args, {Task}) => {
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
    project: async ({project}) => {
        return (await Project.findById(project))
    },
    team: async ({team}) => {
        return (await Team.findById(team))
    },
    organization: async ({_id}) => {
        return (await Organization.find({task: _id}))
    },
};
const TaskMutationResolver ={
    createTask: async (parent, args, { Task, User }) => {
        let task = await new Task(
            {
                tasktitle : args.tasktitle,
                taskdescription: args.taskdescription,
                group: args.group,
                project: args.project,
                team: args.team,
                taskcurrentowner: args.taskcurrentowner,
            }
        ).save();

        if(args.group) {
            let groupForTasks = await Group.findById(args.group);
            //go into that groups tasks and push in new tasks id
            groupForTasks.tasks.push(task._id);
            //save groupTask object with new task id pushed in
            await groupForTasks.save();
        }
        if(args.project) {
            let projectForTasks = await Project.findById(args.project);
            //go into that groups tasks and push in new tasks id
            projectForTasks.tasks.push(task._id);
            //save groupTask object with new task id pushed in
            await projectForTasks.save();
        }
        if(args.team) {
            let teamForTasks = await Team.findById(args.team);
            //go into that groups tasks and push in new tasks id
            teamForTasks.tasks.push(task._id);
            //save groupTask object with new task id pushed in
            await teamForTasks.save();
        }
        if(args.plandate != 'Invalid Date'  ) {
            await Task.findByIdAndUpdate(task._id, {
                    $set: {
                        plandate: args.plandate}},
                {new: true}
            );
        }
        if(args.dueDate != 'Invalid Date') {
            await Task.findByIdAndUpdate(task._id, {
                    $set: {
                        duedate: args.dueDate}},
                {new: true}
            );
        }

        let group = await Group.findById(args.group);
        if(group.iscompleted === true){
            await Group.findByIdAndUpdate(
                group,
                {$set: {iscompleted: false}}
            );
        }
        return task
    },
    createTaskByGroup: async (parent, args, { Task, User, Team, Group, Project }) => {
        let task = await new Task(args).save();
        //if task object has current group
        if(args.group) {
            //save that group object to variable
            let groupTask = await Group.findById(args.group);
            //go into that groups tasks and push in new tasks id
            groupTask.tasks.push(task._id);
            //save groupTask object with new task id pushed in
            await groupTask.save();
        }
        //if task object has current project
        if(args.project) {
            //save that project object to variable
            let projectTask = await Project.findById(args.project);
            //go into that projects tasks and push in new tasks id
            projectTask.tasks.push(task._id);
            await projectTask.save();
        }

        if(args.team) {
            let teamTask = await Team.findById(args.team);
            teamTask.tasks.push(task._id);
            await teamTask.save();
        }
        if(args.project) {
            let projectTask = await Project.findById(args.project);
            projectTask.tasks.push(task._id);
            await projectTask.save();
        }
        if(args.group) {
            let groupTask = await Group.findById(args.group);
            groupTask.tasks.push(task._id);
            await groupTask.save();
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
            task.taskpriorowners.push(task.taskcurrentowner);
            await task.save();
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
        if(args.priority) {
            let taskpriority = await Priority.findById(args.priority);
            await task.priority.save(taskpriority._id);
            taskpriority.tasks.push(task._id);
            await taskpriority.save();
        }
        return task
    },
    updateTaskTeam: async(parent, args, {Task}) => {
            let oldtask = await Task.findById(args._id);

            await Group.update({_id: oldtask.group }, {$pull: { tasks: oldtask._id }});
            await Project.update({_id: oldtask.project }, {$pull: { tasks: oldtask._id }});
            await Team.update({_id: oldtask.team }, {$pull: { tasks: oldtask._id }});

            let task = await Task.findByIdAndUpdate(args._id, {
                    $set: {
                        group: args.group,
                        project: args.project,
                        team: args.team,
                    }
                },
                {new: true}
            );
            let taskgroup = await Group.findById(args.group);
            taskgroup.tasks.push(task._id);
            await taskgroup.save();
            let taskproject = await Project.findById(args.project);
            taskproject.tasks.push(task._id);
            await taskproject.save();
            let taskteam = await Team.findById(args.team);
            taskteam.tasks.push(task._id);
            await taskteam.save();

    },
    updateTaskProject: async(parent, args, {Task}) => {
            let oldtask = await Task.findById(args._id);
            await Group.update({_id: oldtask.group }, {$pull: { tasks: oldtask._id }});
            await Project.update({_id: oldtask.project }, {$pull: { tasks: oldtask._id }});
            let task = await Task.findByIdAndUpdate(args._id, {
                    $set: {
                        group: args.group,
                        project: args.project,
                    }
                },
                {new: true}
            );
            let taskgroup = await Group.findById(args.group);
            taskgroup.tasks.push(task._id);
            await taskgroup.save();
            let taskproject = await Project.findById(args.project);
            taskproject.tasks.push(task._id);
            await taskproject.save();
    },
    updateTaskGroup: async(parent, args, {Task}) => {
            let oldtask = await Task.findById(args._id);
            await Group.update({_id: oldtask.group }, {$pull: { tasks: oldtask._id }});
            let task = await Task.findByIdAndUpdate(args._id, {
                    $set: {
                        group: args.group,
                    }
                },
                {new: true}
            );
            let taskgroup = await Group.findById(args.group);
            taskgroup.tasks.push(task._id);
            await taskgroup.save();

            let group = await Group.findById(args.group);
            if(group.iscompleted === true){
                await Group.findByIdAndUpdate(
                    group,
                    {$set: {iscompleted: false}}
                );
            }
    },
    updateTaskUser: async(parent, args, {Task}) => {
            let oldtask = await Task.findById(args._id);
            let task = await Task.findByIdAndUpdate(args._id, {
                    $set: {
                        taskcurrentowner: args.taskcurrentowner,
                    }
                },
                {new: true}
            );
            task.taskpriorowners.push(oldtask.taskcurrentowner);
            await task.save();
    },
    completeTask: async (parent, args, {Task}) =>{

        let task = await Task.findByIdAndUpdate(
            args._id,
            {$set: {iscompleted: args.iscompleted
                    , completeddate: args.completeddate}}, function (err, task){
                if(err) return err;
                return task;
            });
        let groupForTasks = await Group.findById(args.groupForTasksId);
        let allTasks = await Task.find( { _id: { $in: groupForTasks.tasks } } );
        let totalTasks = allTasks.length;
        let totalTasksCompleted = allTasks.filter(task => task.iscompleted === true).length;
        if(totalTasks === totalTasksCompleted){
            await Group.findByIdAndUpdate(
            args.groupForTasksId,
            {$set: {iscompleted: true}
            });
        }

    },
    removeTask: async (parent, args, {Task}) =>{
         await Task.remove({_id: args._id});
    }
}; 

export {TaskType, TaskMutation, TaskQuery, TaskQueryResolver, TaskNested, TaskMutationResolver};
