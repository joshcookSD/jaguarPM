const mongoose = require("mongoose");
const User = require("./user");

const clientSchema = new mongoose.Schema(
    {
        clienttitle: {
            type: String,
            required: true,
            maxLength: 50,
            minLength: 3
        },
        clientDescription: {
            type: String,
            maxLength: 160
        },
        clientcomments: [{
            commentuser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            clientcomment: {
                type: String
            }
        }],
        contacts: [{
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
        }],
        milestone: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Milestone"
        }],
        requirements: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Requirements"
        }],
        project: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }]
    },
    {
        timestamps:true
    });

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
