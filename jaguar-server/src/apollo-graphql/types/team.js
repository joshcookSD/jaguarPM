import User from "../../models/user";
import Task from "../../models/task";
import Project from "../../models/project";
import Comment from "../../models/comment";
import Group from "../../models/group";
import Time from "../../models/time";
import {teamError} from "../formatErrors";
import Organization from '../../models/organization';
import PlannedTime from "../../models/plannedtime";
import Milestone from "../../models/milestone";
import Team from "../../models/team";


const TeamType = `
    type Team {
        _id: String
        teamtitle: String!
        teamdescription: String
        owner: User
        users: [User]
        tasks: [Task]
        projects: [Project]
        defaultproject: Project
        groups: [Group]
        organization: Organization
    }
    
    type CreateTeamResponse {
        ok: Boolean!
        team: Team
        errors: [Error!]
    }
`;

const TeamQuery = `
    allTeams: [Team]
    team(_id: String): Team
    teamsByOrg(organization: String): [Team]
    teamsByOwner( owner: String ): [Team]
    teamsByUser( user: String ): [Team]
`;

const TeamMutation = `
    createTeam(
        teamtitle: String!,
        teamdescription: String,
        owner: String,
        organization: String!,
    ) : CreateTeamResponse
    addTeamUser(
        _id: String
        user: String,
    ) : Team
    removeTeamUser(
        _id: String 
        user: String
        projectId: String
    ): Team
    removeProjectFromTeam(
    projectGroupTasksComments : String,
    projectGroupTasks : String,
    projectGroupTasksTime : String,
    taskplannedtime : String,
    groupUsersId : String,
    projectGroupComments : String,
    projectGroupGroupTime : String,
    projectGroupPlannedTime : String,
    projectGroup : String,
    projecLevelTasksComments : String,
    projectlevelTasksTime : String,
    projectTaskplannedtime : String,
    projectLevelTasks : String,
    projectUsersId : String,
    projectTime : String,
    projectPlannedTime : String,
    groupToDeleteId : String,
    projectId : String,
    projectTeam : String
    ): Team
`;

const TeamQueryResolver = {
    allTeams: async (parent, args, {Team}) => {
        const teams = await Team.find({});
        return teams.map(team => {
            team._id = team._id.toString();
            return team
        })
    },
    team: async (parent, args, {Team}) => {
        return await Team.findById(args._id.toString())
    },
    teamsByOrg: async (parent, { organization }, { Team }) => {
        const teamOrg = await Organization.findById( organization )
        return await Team.find({ organization: teamOrg })
    },
    teamsByOwner: async (parent, args, { Team }) => {
        const teamowner = await User.findById(args.owner.toString());
        return await Team.find({ owner: teamowner })
    },
    teamsByUser: async (parent, args, {Team}) => {
        const owner = await User.findById(args.user.toString());
        return await Team.find({users: owner})
    },
};



const TeamNested = {
    tasks: async ({_id}) => {
        return (await Task.find({team: _id}))
    },
    projects: async ({_id}) => {
        return (await Project.find({team: _id}))
    },
    users: async ({_id}) => {
        return (await User.find({team: _id}))
    },
    owner: async ({owner}) => {
        return await User.findById(owner)
    },
    defaultproject: async ({defaultproject}) => {
        return await Project.findById(defaultproject)
    },
    organization: async ({organization}) => {
        return await Organization.findById(organization)
    },
    groups: async ({_id}) => {
        return (await Group.find({team: _id}))
    }
};

const TeamMutationResolver = {
    createTeam: async (parent, {teamtitle, teamdescription, owner, organization}, {Team}) => {
        try {
            const err = [];
            let teamtitleErr = await teamError(teamtitle);
            if (teamtitleErr) {
                err.push(teamtitleErr)
            }
            if (!err.length) {
                let newteam = await new Team({
                    teamtitle,
                    teamdescription,
                    owner,
                    users: owner,
                    organization
                }).save();
                console.log('saved team');
                //look at user collection and find user that has id of owner
                let teamuser = await User.findById(owner.toString());
                //look at org collection and find org that has id of organization
                let teamorganization = await Organization.findById(organization);
                //using the found org look at its teams and push the new teams id into it
                teamorganization.team.push(newteam._id);
                //wait for teamorg to come back and save
                await teamorganization.save();

                //save new project to the new team w/ users
                let project = await new Project({
                    projecttitle: 'General',
                    projectdescription: `General Project for ${teamtitle}`,
                    team: newteam._id,
                    leader: teamuser._id,
                    users: teamuser._id
                }).save();
                console.log('saved project')

                //save new group to the new project and team w/users
                let group = await new Group({
                    grouptitle: 'General',
                    groupdescription: `General Group`,
                    project: project._id,
                    team: newteam._id,
                    users: teamuser._id
                }).save();
                //look at team owner push the new group id into his groups
                teamuser.groups.push(group._id);
                teamuser.projects.push(project._id);
                teamuser.team.push(newteam._id);
                await teamuser.save();

                await Team.findByIdAndUpdate(newteam._id, {
                        $set: {
                            defaultproject: project._id,
                            projects: project._id,
                            groups: group._id,
                        }
                    },
                    {new: true}
                );
                await Project.findByIdAndUpdate(project._id, {
                        $set: {
                            defaultgroup: group._id,
                            group: group._id
                        }
                    },
                    {new: true}
                );
                return {
                    ok: true,
                    newteam,
                };
            } else {
                return {
                    ok: false,
                    errors: err,
                }
            }
        } catch (e) {
            return {
                ok: false,
                errors: [{path: 'teamtitle', message: 'something did not go well'}]
            }
        }
    },
    addTeamUser: async (parent, {_id, user}, {Team}) => {
        let teamuser = await User.findById(user);
        let teams = await Team.findById(_id);
        teamuser.team.push(teams._id);
        await teamuser.save();
        teams.users.push(teamuser._id);
        await teams.save();
        return teams
    },
    removeProjectFromTeam: async (parent,
                              {
                                  projectGroupTasksComments,
                                  projectGroupTasks,
                                  projectGroupTasksTime,
                                  taskplannedtime,
                                  groupUsersId,
                                  groupsToDeleteId,
                                  projectGroupComments,
                                  projectGroupGroupTime,
                                  projectGroupPlannedTime,
                                  projectGroup,
                                  // projectGrouplevelTasksComments,
                                  // projectGrouplevelTasksTime,
                                  // groupTaskplannedtime,
                                  // projectGroupLevelTasks,
                                  projecLevelTasksComments,
                                  projectlevelTasksTime,
                                  projectTaskplannedtime,
                                  projectLevelTasks,
                                  projectUsersId,
                                  // projectComments,
                                  // projectMilestone,
                                  projectTime,
                                  projectPlannedTime,
                                  projectId,
                                  projectTeam
                              }, {Team}) => {
        //task level
            const projectGroupTasksCommentsArray = projectGroupTasksComments.split(',');
            const projectGroupTasksTimeArray = projectGroupTasksTime.split(',');
            const taskplannedtimeArray = taskplannedtime.split(',');
            const projectGroupTasksArray = projectGroupTasks.split(',');

        //group level
            //group level tasks
            //     const projectGrouplevelTasksCommentsArray = projectGrouplevelTasksComments.split(',');
            //     const projectGrouplevelTasksTimeArray = projectGrouplevelTasksTime.split(',');
            //     const groupTaskplannedtimeArray = groupTaskplannedtime.split(',');
            //     const projectGroupLevelTasksArray = projectGroupLevelTasks.split(',');

            //group top level
                const groupUsersIdArray = groupUsersId.split(',');
                const projectGroupCommentsArray = projectGroupComments.split(',');
                const projectGroupGroupTimeArray = projectGroupGroupTime.split(',');
                const projectGroupPlannedTimeArray = projectGroupPlannedTime.split(',');
                const projectGroupArray = projectGroup.split(',');

        //project level
            //project tasks
                const projecLevelTasksCommentsArray = projecLevelTasksComments.split(',');
                const projectlevelTasksTimeArray = projectlevelTasksTime.split(',');
                const projectTaskplannedtimeArray = projectTaskplannedtime.split(',');
                const projectLevelTasksArray = projectLevelTasks.split(',');

            //project top level
            //     const projectCommentsArray = projectComments.split(',');
            //     const projectMilestoneArray = projectMilestone.splice(',');
                const projectUsersIdArray = projectUsersId.split(',');
                const projectTimeArray = projectTime.split(',');
                const projectPlannedTimeArray = projectPlannedTime.split(',');

        // group task level
        // if( projectGroupTasksComments){
        //      await Comment.remove(
        //          {_id: {$in: projectGroupTasksCommentsArray}},
        //     );
        // }
        // if( projectGroupTasksTime){
        //     await Time.remove(
        //         {_id: {$in: projectGroupTasksTimeArray}},
        //     );
        // }
        // if( taskplannedtime){
        //     await PlannedTime.remove(
        //         {_id: {$in: taskplannedtimeArray}},
        //     );
        // }
        if(projectGroupTasks){
            await Task.remove(
                {_id: {$in: projectGroupTasksArray}},
            );
        }
        // //group level
        // //group tasks
        // // if( projectGrouplevelTasksComments){
        // //     await Comment.remove(
        // //         {_id: {$in: projectGrouplevelTasksCommentsArray}},
        // //
        // //     );
        // // }
        // // if( projectGrouplevelTasksTime){
        // //     await Time.remove(
        // //         {_id: {$in: projectGrouplevelTasksTimeArray}},
        // //
        // //     );
        // // }
        // // if( groupTaskplannedtime){
        // //     await PlannedTime.remove(
        // //         {_id: {$in: groupTaskplannedtimeArray}},
        // //
        // //     );
        // // }
        // // if(projectGroupLevelTasks){
        // //     await Task.remove(
        // //         {_id: {$in: projectGroupLevelTasksArray}},
        // //
        // //     );
        // // }
        //
        // //group top level

        if(groupsToDeleteId) {
            await User.update(
                {_id: {$in: groupUsersIdArray}},
                {$pull: { groups : groupsToDeleteId }},
                {multi: true}
            );
        }
        // if(projectGroupComments) {
        //     await Comment.remove(
        //         {_id: {$in: projectGroupCommentsArray}},
        //     );
        // }
        // if(projectGroupGroupTime) {
        //     await Time.remove(
        //         {_id: {$in: projectGroupGroupTimeArray}},
        //     );
        // }
        // if(projectGroupPlannedTime) {
        //     await PlannedTime.remove(
        //         {_id: {$in: projectGroupPlannedTimeArray}},
        //     );
        // }
        if(projectGroup){
            await Group.remove(
                {_id: {$in: projectGroupArray}}
            );
        }
        // //project level
        //     //project tasks
        // if( projecLevelTasksComments){
        //     await Comment.remove(
        //         {_id: {$in: projecLevelTasksCommentsArray}},
        //     );
        // }
        // if( projectlevelTasksTime){
        //     await Time.remove(
        //         {_id: {$in: projectlevelTasksTimeArray}},
        //     );
        // }
        // if( projectTaskplannedtime){
        //     await PlannedTime.remove(
        //         {_id: {$in: projectTaskplannedtimeArray}},
        //     );
        // }
        // if(projectLevelTasks){
        //     await Task.remove(
        //         {_id: {$in: projectLevelTasksArray}},
        //
        //     );
        // }
        // // // project comments
        // // // if(projectComments) {
        // // //     await Comment.remove(
        // // //         {_id: {$in: projectCommentsArray}},
        // // //
        // // //     );
        // // // }
        // // // if(projectMilestone){
        // // //     await Milestone.remove(
        // // //         {_id: {$in: projectMilestoneArray}},
        // // //
        // // //     );
        // // // }
        // //
        await User.update(
            {_id: {$in: projectUsersIdArray}},
            {$pull: { projects : projectUsersIdArray}},
            {multi: true}
        );
        // if(projectTime) {
        //     await Time.remove(
        //         {_id: {$in: projectTimeArray}},
        //     );
        // }
        // if(projectPlannedTime) {
        //     await PlannedTime.remove(
        //         {_id: {$in: projectPlannedTimeArray}},
        //         {multi: true}
        //     );
        // }
        if(projectTeam){
            await Team.update(
                {_id: projectTeam},
                {$pull: {projects: projectId}},
                {multi: true}
            );
        }

        await Project.deleteOne(
            {_id: projectId}
        );

    },
    removeTeamUser: async (parent, {_id, user, projectId}, {Team}) => {
        console.log(_id);
        let teamUserToRemove = await User.findById(user);
        let teamToRemoveUserFrom = await Team.findById(_id);
        let projectIdArray = projectId.split(',');

        if(projectId) {
            //going into team
            await Project.update(
                //find each project with id provided from array
                { _id: { $in: projectIdArray } },
                //got to that projects users and pull out user from that array
                { $pull: { users: teamUserToRemove._id  } },
                //multiple documents
                { multi: true }
            );

            await User.update(
                //find user with id provided
                { _id: teamUserToRemove._id },
                //go to users team's pull teams provided from array
                { $pullAll: { team: projectId.split(',') } }
            );
            //go into users team array and pull the id of the team were removing them from
            teamUserToRemove.team.pull(teamToRemoveUserFrom._id);
            await teamUserToRemove.save();

            //go into team's users array and pull the id of the user were removing from the org
            teamToRemoveUserFrom.users.pull(teamUserToRemove._id);
            await teamToRemoveUserFrom.save();

            return teamToRemoveUserFrom
        }else{
            //go into users team array and pull the id of the team were removing them from
            teamUserToRemove.team.pull(teamToRemoveUserFrom._id);
            await teamUserToRemove.save();

            //go into team's users array and pull the id of the user were removing from the org
            teamToRemoveUserFrom.users.pull(teamUserToRemove._id);
            await teamToRemoveUserFrom.save();

            return teamToRemoveUserFrom
        }
    }
};

export {TeamType, TeamMutation, TeamQuery, TeamQueryResolver, TeamNested, TeamMutationResolver};
