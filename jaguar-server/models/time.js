const mongoose = require("mongoose");
const User = require("./user");
const Task = require("./task");

const timeSchema = new mongoose.Schema(
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
        comment: {
          type: String,
          required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    },
    {
        timestamps:true
    });

const Time = mongoose.model("Time", timeSchema);
module.exports = Time;
