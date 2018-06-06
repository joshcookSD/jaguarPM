import Task from "../../models/task";
import Group from "../../models/group";
import Milestone from "../../models/milestone";
import Requirement from "../../models/requirement";
import User from "../../models/user";
import Time from "../../models/time";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";
import Team from "../../models/team";

const ProjectType = `
    type Project {
        _id: String
        projecttitle: String
        projectdescription: String
        plannedcompletiondate: Date
        duedate: Date
        tasks: [Task]
        comments: [Comment]
        groups: [Group]
        defaultgroup: Group
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
        team: String!,
        leader: String,
        users: String
) : Project
    updateProject(
        _id: String,
        projecttitle: String,
        projectdescription: String,
        plannedcompletiondate: Date,
        duedate: Date,
        leader: String, 
        team: String
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
        await user.save();
        let projectteam = await Team.findById(args.team);
        let group = await new Group({
            grouptitle: 'General',
            groupdescription: `General Group`,
            project: project._id,
            team: projectteam._id,
            users: user._id
        }).save();
        projectteam.projects.push(project._id);
        projectteam.groups.push(group._id);
        await projectteam.save();
        user.groups.push(group._id);
        await user.save();
        await Project.findByIdAndUpdate(project._id, {
                $set: {
                    groups: group._id,
                    defaultgroup: group._id,
                }
            },
            {new: true}
        );
        return project
    },
    updateProject: async (parent, args, { Project}) => {

        if(args.projecttitle) {
           await Project.findByIdAndUpdate(args._id, {
                    $set: {
                        projecttitle: args.projecttitle
                    }
                },
                {new: true}
            );
        }
        const project = await Project.findById(args._id);

        if(args.leader) {
            await Project.findByIdAndUpdate(args._id, {
                    $set: {
                        leader: args.leader
                    }
                },
                {new: true}
            );
        }

        if(args.projectdescription) {
            await Project.findByIdAndUpdate(args._id, {
                    $set: {
                        projectdescription: args.projectdescription
                    }
                },
                {new: true}
            );
        }

        if(args.plannedcompletiondate != 'Invalid Date') {
            await Project.findByIdAndUpdate(args._id, {
                    $set: {
                        plannedcompletiondate: args.plannedcompletiondate
                    }
                },
                {new: true}
            );
        }

            if(args.duedate != 'Invalid Date') {
                await Project.findByIdAndUpdate(args._id, {
                        $set: {
                            duedate: args.duedate
                        }
                    },
                    {new: true}
                );
            }

        if(args.team) {
            let projectteam = await Team.findById(args.team);
            await project.team.save(projectteam._id);
            projectteam.projects.push(project._id);
            await projectteam.save();
        }

    }
};

const ProjectNested = {
    users: async ({_id}) => {
        return (await User.find({projects: _id}))
    },
    leader: async ({leader}) => {
        return (await User.findById(leader))
    },
    projecttime: async ({_id}) => {
        return (await Time.find({project: _id}))
    },
    projectplannedtime: async ({_id}) => {
        return (await PlannedTime.find({project: _id}))
    },
    priority: async ({priority}) => {
        return (await Priority.findById(priority))
    },
    comments: async ({comment}) => {
        return (await Comment.find({comment}))
    },
    tasks: async ({_id}) => {
        return (await Task.find({project: _id}))
    },
    groups: async ({_id}) => {
        return (await Group.find({project: _id}))
    },
    defaultgroup: async ({defaultgroup}) => {
        return (await Group.findById(defaultgroup))
    },
    milestone: async ({milestone}) => {
        return (await Milestone.find({milestone: _id}))
    },
    requirements: async ({requirement}) => {
        return (await Requirement.find({requirement: _id}))
    },
    team: async ({team}) => {
        return (await Team.findById(team))
    },
};

export {ProjectType, ProjectMutation, ProjectQuery, ProjectQueryResolver, ProjectNested, ProjectMutationResolver};
