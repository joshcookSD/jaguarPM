const mongoose = require("mongoose");
import Organization from './organization';
import User from './user';
import Project from './project';
import Group from './group';
import Task from './task';
import Time from './time';


const teamSchema = new mongoose.Schema(
    {
        teamtitle: {
            type: String,
            required: true,
            maxLength: 50,
            minLength: 3
        },
        teamdescription: {
            type: String,
            maxLength: 160
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }],
        teamtime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Time"
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        defaultproject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }],
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        },
    },
    {
        timestamps:true
    });

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
