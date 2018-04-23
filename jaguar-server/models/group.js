const mongoose = require("mongoose");
const User = require("./user");
const Priority = require("./priority");

const groupSchema = new mongoose.Schema(
    {
        grouptitle: {
            type: String,
            required: true,
            maxLength: 100,
            minLength: 3
        },
        groupdescription: {
            type: String,
            required: true,
            maxLength: 160
        },
        task: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "task"
        }],
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        groupcomments: [{
            commentuser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            commentuser: {
                type: String
            }
        }],
        grouptime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Time"
        }],
        groupplannedtime: [{
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
        }
    },
    {
        timestamps: true
    }
);

groupSchema.pre("remove", async function(next) {
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

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;