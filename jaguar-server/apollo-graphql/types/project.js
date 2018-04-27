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
        plannedcompletiondate: String
        duedate: String
        tasks: [Task]
        comments: [Comment]
        groups: [Group]
        milestone: [Milestone]
        requirements: [Requirement] 
        users: [User]
        leader: User
        team: Team
        projecttime: [Time]
        projectplannedtime: [PlannedTime]
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
        projectdescription: String,
        team: String!
        leader: String
        users: String
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
        let user = await User.findById(args.users);
        user.projects.push(project._id);
        return project
    }
};

const ProjectNested = {
    users: async ({_id}) => {
        return (await User.find({project: _id}))
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
    comments: async ({comment}) => {
        return (await Comment.find({comment}))
    },
    tasks: async ({task}) => {
        return (await Task.find({task: _id}))
    },
    groups: async ({group}) => {
        return (await Group.find({group: _id}))
    },
    milestone: async ({milestone}) => {
        return (await Milestone.find({milestone: _id}))
    },
    requirements: async ({requirement}) => {
        return (await Requirement.find({requirement: _id}))
    },
};

export {ProjectType, ProjectMutation, ProjectQuery, ProjectQueryResolver, ProjectNested, ProjectMutationResolver};
