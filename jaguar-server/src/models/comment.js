const mongoose = require("mongoose");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Project = require("./project");

const commentSchema = new mongoose.Schema({
    
    comment: {
        type: String,
        required: true,
        maxLength: 250,
        minLength: 3
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
    Project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;