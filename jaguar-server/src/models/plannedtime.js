const mongoose = require("mongoose");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Project = require("./project");

const plannedTimeSchema = new mongoose.Schema(
    {
        time: {
            type: Number,
            required: true,
            min: 0
        },
        date: {
            type: Date,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        requirement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Requirement"
        }
    },
    {
        timestamps:true
    });

const PlannedTime = mongoose.model("PlannedTime", plannedTimeSchema);
module.exports = PlannedTime;
