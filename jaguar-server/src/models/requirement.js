const mongoose = require("mongoose");
const User = require("./user");
const Priority = require("./priority");

const requirementSchema = new mongoose.Schema(
    {
        requirementtitle: {
            type: String,
            required: true,
            maxLength: 100,
            minLength: 3
        },
        requirementdescription: {
            type: String,
            required: true,
            maxLength: 160
        },
        isApproved: {
            type: Boolean,
            required: true,
            default: false
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        // requirementcomments: [{
        //     commentuser: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "User"
        //     },
        //     commentuser: {
        //         type: String
        //     }
        // }],
        requirementplannedtime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PlannedTime"
        }],
        plannedcompletiondate: {
            type: Date
        },
        duedate: {
            type: Date
        },
        priority: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Priority"
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    },
    {
        timestamps: true
    }
);

requirementSchema.pre("remove", async function(next) {
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

const Requirement = mongoose.model("Requirement", requirementSchema);
module.exports = Requirement;