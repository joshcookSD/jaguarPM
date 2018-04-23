const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema(
    {
        usertype: {
            type: String,
            required: true
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps:true
    });

const UserTypeOrg = mongoose.model("UserTypeOrg", userTypeSchema);
module.exports = UserTypeOrg;
