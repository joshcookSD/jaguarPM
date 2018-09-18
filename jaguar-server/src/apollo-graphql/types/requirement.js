import Project from "../../models/project";
import Group from "../../models/group";
import Milestone from "../../models/milestone";
import Requirement from "../../models/requirement";
import User from "../../models/user";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";
import Time from "../../models/time";

const RequirementType = `
    type Requirement {
        _id: String
        requirementtitle: String
        requirementdescription: String
        isApproved: Boolean
        plannedcompletiondate: Date
        duedate: Date
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
        project: String
        duedate: Date
        isApproved: Boolean
        plannedcompletiondate: Date
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
    createRequirement: async (parent, args, { Requirement, Project}) => {
        let requirement = await new Requirement({
            requirementtitle: args.requirementtitle,
            requirementdescription: args.requirementdescription,
            project: args.project,
        }).save();
        if(args.project){
            await Project.findByIdAndUpdate(args.project, {
                    $push: {
                        requirements: requirement._id
                    }
                },
                {upsert: true}
            );
        }
        if(args.duedate != 'Invalid Date'){
            await Requirement.findByIdAndUpdate(requirement._id, {
                    $set: {
                        duedate: args.duedate
                    }
                },
                {upsert: true}
            );
        }
        if(args.plannedcompletiondate != 'Invalid Date'){
            await Requirement.findByIdAndUpdate(requirement._id, {
                    $set: {
                        plannedcompletiondate: args.plannedcompletiondate
                    }
                },
                {upsert: true}
            );
        }
        return requirement
    }
};

const RequirementNested = {
    users: async ({_id}) => {
        return (await User.find({users: _id}))
    },
    requirementplannedtime: async ({_id}) => {
        return (await PlannedTime.find({requirement: _id}))
    },
    priority: async ({_id}) => {
        return (await Priority.find({priority: _id}))
    },
    group: async ({_id}) => {
        let req = await Requirement.findById(_id);
        return (await Group.findById(req.group));
    },
    project: async ({_id}) => {
        console.log(_id)
        return (await Project.find({requirements: _id}))
    },
};

export {RequirementType, RequirementMutation, RequirementQuery, RequirementQueryResolver, RequirementNested, RequirementMutationResolver};
