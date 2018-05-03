const mongoose = require("mongoose");
const User = require("./user");


const milestoneSchema = new mongoose.Schema(
    {
        milestonetitle: {
            type: String,
            required: true,
            maxLength: 50,
            minLength: 3
        },
        milestoneDescription: {
            type: String,
            maxLength: 160
        },
        plannedcompletiondate: {
            type: Date
        },
        duedate: {
            type: Date
        },
        // milestonecomments: [{
        //     commentuser: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "User"
        //     },
        //     milestonecomment: {
        //         type: String
        //     }
        // }],
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        task: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }],
        group: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }]
    },
    {
        timestamps:true
    });

const Milestone = mongoose.model("Milestone", milestoneSchema);
module.exports = Milestone;
