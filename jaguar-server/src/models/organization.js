const User = require("./user");
const Team = require("./team");

const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        orgtitle: {
            type: String,
            required: true,
            maxLength: 50,
            minLength: 3
        },
        orgdescription: {
            type: String,
            maxLength: 160
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        usertype: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        team: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }],
        project: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        // client: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Client"
        // }]
    },
    {
        timestamps:true
    });

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
