import User from "../../models/user";
import Group from "../../models/group"

const MilestoneType = `
    type Milestone {
        _id: String
        milestonetitle: String
        milestonedescription: String
        users: [User]
        plannedcompletiondate: String
        duedate: String
        group: [Group]
    }
`;

const MilestoneQuery = `
    allMilestones: [Milestone]
    milestone(_id: String): Milestone
`;

const MilestoneMutation = `
    createMilestone(
        milestonetitle: String,
        milestonedescription: String
) : Milestone
`;

const MilestoneQueryResolver = {
    allMilestones: async (parent, args, {Milestone}) => {
        const milestones = await Milestone.find({});
        return milestones.map(milestone => {
            milestone._id = milestone._id.toString();
            return milestone
        })
    },
    milestone: async (parent, args, {Milestone}) => {
        return await Milestone.findById(args._id.toString())
    },
};

const MilestoneMutationResolver ={
    createMilestone: async (parent, args, { Milestone}) => {
        let milestone = await new Milestone(args).save();
        return milestone
    }
};

const MilestoneNested = {
    users: async ({users}) => {
        return (await User.find({users: _id}))
    },
    group: async ({group}) => {
        return (await Group.find({group: _id}))
    },
};

export {MilestoneType, MilestoneMutation, MilestoneQuery, MilestoneQueryResolver, MilestoneNested, MilestoneMutationResolver};
