const mongoose = require("mongoose");
const User = require("./user");
const Team = require("./team");
// const TaskType = require("./tasktype");
// const Priority = require("./priority");

const taskSchema = new mongoose.Schema(
    {
        tasktitle: {
            type: String,
            required: true,
            maxLength: 100,
            minLength: 3
        },
        taskdescription: {
            type: String,
            maxLength: 160
        },
        taskcurrentowner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        taskpriorowners: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        iscompleted: {
            type: Boolean,
            default: false
        },
        plandate: {
          type: Date,
        },
        completeddate: {
            type: Date,
        },
        taskstatus: {
          type: String,
        },
        tasktime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Time"
        }],
        taskplannedtime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PlannedTime"
        }],
        plannedcompletiondate: {
            type: Date
        },
        duedate: {
            type: Date
        },
        tasktype: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TaskType"
        },
        priority: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Priority"
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        }
    },
    {
        timestamps: true
    }
);

taskSchema.pre("remove", async function(next) {
    try {
        // find a user
        let user = await User.findById(this.user);
        // remove the id of the message from their messages list
        user.messages.remove(this.id);
        // save that user
        await user.save();
        // return next
        return next();
    } catch (err) {
        return next(err);
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;