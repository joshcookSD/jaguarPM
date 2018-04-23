import Task from "../../models/task";
import Group from "../../models/group";
import Milestone from "../../models/milestone";
import Requirement from "../../models/requirement";
import User from "../../models/user";
import Time from "../../models/time";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";

const ProjectType = `
    type Project {
        _id: String
        projecttitle: String
        projectdescription: String
        task: [Task]
        group: [Group]
        milestone: [Milestone]
        requirement: [Requirement] 
        users: [User]
        projecttime: [Time]
        projectplannedtime: [PlannedTime]
        plannedcompletiondate: String
        duedate: String
        priority: Priority
    }
`;

const ProjectQuery = `
    allProjects: [Project]
    project(_id: String): Project
`;

const ProjectMutation = `
    createProject(
        projecttitle: String,
        projectdescription: String
) : Project
`;

const ProjectQueryResolver = {
    allProjects: async (parent, args, {Project}) => {
        const projects = await Project.find({});
        return projects.map(project => {
            project._id = project._id.toString();
            return project
        })
    },
    project: async (parent, args, {Project}) => {
        return await Project.findById(args._id.toString())
    },
};

const ProjectMutationResolver ={
    createProject: async (parent, args, { Project}) => {
        let project = await new Project(args).save();
        return project
    }
};

const ProjectNested = {
    users: async ({users}) => {
        return (await User.find({users: _id}))
    },
    projecttime: async ({projecttime}) => {
        return (await Time.find({projecttime: _id}))
    },
    projectplannedtime: async ({projectplannedtime}) => {
        return (await PlannedTime.find({projectplannedtime: _id}))
    },
    priority: async ({priority}) => {
        return (await Priority.find({priority: _id}))
    },
    task: async ({task}) => {
        return (await Task.find({task: _id}))
    },
    group: async ({group}) => {
        return (await Group.find({group: _id}))
    },
    milestone: async ({milestone}) => {
        return (await Milestone.find({milestone: _id}))
    },
    requirement: async ({requirement}) => {
        return (await Requirement.find({requirement: _id}))
    },
};

export {ProjectType, ProjectMutation, ProjectQuery, ProjectQueryResolver, ProjectNested, ProjectMutationResolver};
