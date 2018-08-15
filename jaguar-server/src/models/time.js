const mongoose = require("mongoose");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Project = require("./project");

const timeSchema = new mongoose.Schema(
    {
        time: {
            type: Number,
            required: true,
        },
        date: {
          type: Date,
          required: true
        },
        timecomment: {
          type: String
        },
        user: {
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
            ref: "project"
        }
    },
    {
        timestamps:true
    });

const Time = mongoose.model("Time", timeSchema);
module.exports = Time;
