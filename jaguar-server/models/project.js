const mongoose = require("mongoose");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Requirement = require("./requirement");
const Team = require("./team");
const Comment = require("./comment");

const projectSchema = new mongoose.Schema(
    {
        projecttitle: {
            type: String,
            required: true,
            maxLength: 50,
            minLength: 3
        },
        projectDescription: {
            type: String,
            maxLength: 160
        },
        plannedcompletiondate: {
            type: Date
        },
        duedate: {
            type: Date
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }],
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }],
        milestones: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Milestone"
        }],
        requirements: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Requirement"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        projecttime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Time"
        }],
        projectplannedtime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PlannedTime"
        }]
    },
    {
        timestamps:true
    });

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
