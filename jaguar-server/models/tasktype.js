const mongoose = require("mongoose");

const taskTypeSchema = new mongoose.Schema(
    {
        tasktype: {
            type: String,
            required: true
        },
        task: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }]
    },
    {
        timestamps:true
    });

const TaskType = mongoose.model("TaskType", taskTypeSchema);
module.exports = TaskType;
