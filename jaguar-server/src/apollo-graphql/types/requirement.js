import Project from "../../models/project";
import Group from "../../models/group";
import Milestone from "../../models/milestone";
import Requirement from "../../models/requirement";
import User from "../../models/user";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";

const RequirementType = `
    type Requirement {
        _id: String
        requirementtitle: String
        requirementdescription: String
        isApproved: Boolean
        plannedcompletiondate: String
        duedate: String
        group: Group
        project: [Project] 
        users: [User]
        requirementplannedtime: [PlannedTime]
        priority: Priority
    }
`;

const RequirementQuery = `
    allRequirements: [Requirement]
    requirement(_id: String): Requirement
`;

const RequirementMutation = `
    createRequirement(
        requirementtitle: String,
        requirementdescription: String
) : Requirement
`;

const RequirementQueryResolver = {
    allRequirements: async (parent, args, {Requirement}) => {
        const requirements = await Requirement.find({});
        return requirements.map(requirement => {
            requirement._id = requirement._id.toString();
            return requirement
        })
    },
    requirement: async (parent, args, {Requirement}) => {
        return await Requirement.findById(args._id.toString())
    },
};

const RequirementMutationResolver ={
    createRequirement: async (parent, args, { Requirement}) => {
        let requirement = await new Requirement(args).save();
        return requirement
    }
};

const RequirementNested = {
    users: async ({users}) => {
        return (await User.find({users: _id}))
    },
    requirementplannedtime: async ({requirementplannedtime}) => {
        return (await PlannedTime.find({requirementplannedtime: _id}))
    },
    priority: async ({priority}) => {
        return (await Priority.find({priority: _id}))
    },
    group: async ({group}) => {
        return (await Group.find({group: _id}))
    },
    project: async ({project}) => {
        return (await Project.find({project: _id}))
    },
};

export {RequirementType, RequirementMutation, RequirementQuery, RequirementQueryResolver, RequirementNested, RequirementMutationResolver};
