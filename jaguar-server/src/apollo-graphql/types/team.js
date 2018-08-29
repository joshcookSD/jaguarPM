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
    teamsById(_id: String): Team
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
      projectToRemoveId: String
      projectUsersIds: String
      projectsTeamId: String
      projectsGroupsTasks: String
      projectsGroups: String
      newDefaultProject: String
      newDefaultProjectgroup: String   
      userId: String   
      teamsDefaultProject: String
      projectPlannedTime : String
      projectTime: String
      groupPlannedTime: String
      groupTime: String
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
    teamsById: async (parent, args, {Team}) => {
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
        let teamuser = await User.findById(owner.toString());
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
                    organization,
                    users: teamuser._id
                }).save();


                let teamorganization = await Organization.findById(organization);
                teamorganization.team.push(newteam._id);
                await teamorganization.save();

                //save new project to the new team w/ users
                let project = await new Project({
                    projecttitle: 'General',
                    projectdescription: `General Project for ${teamtitle}`,
                    team: newteam._id,
                    leader: teamuser._id,
                    users: teamuser._id
                }).save();

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
                newteam.projects.push(project._id)
                newteam.groups.push(group._id)
                await teamuser.save();

                await Project.findByIdAndUpdate(project._id, {
                        $set: {
                            defaultgroup: group._id,
                            group: group._id
                        }
                    },
                    {upsert: true}
                );
                await Team.findByIdAndUpdate(newteam._id, {
                        $set: {
                            defaultproject: project._id,
                            project: project._id
                        }
                    },
                    {upsert: true}
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
                                  projectToRemoveId,
                                  projectUsersIds,
                                  projectsTeamId,
                                  projectsGroupsTasks,
                                  newDefaultProject,
                                  newDefaultProjectgroup,
                                  projectsGroups,
                                  teamsDefaultProject,
                                  userId,
                                  projectPlannedTime,
                                  projectTime,
                                  groupPlannedTime,
                                  groupTime
                              }, {Team}) => {

        const projectsGroupsTasksArray = projectsGroupsTasks.split(',');
        const projectPlannedTimeArray = projectPlannedTime.split(',');
        const projectTimeArray = projectTime.split(',');
        const groupPlannedTimeArray = groupPlannedTime.split(',');
        const groupTimeArray = groupTime.split(',');


        //USERS
        if(projectUsersIds){
            await User.update(
                {_id: {$in: projectUsersIds.split(',')}},
                {$pull: { projects : projectToRemoveId}},
                {multi: true}
            );
        }
        if(projectUsersIds){
            await User.update(
                {_id: {$in: projectUsersIds.split(',')}},
                {$pullAll: { groups : projectsGroups.split(',')}},
                {multi: true}
            );
        }
        if(projectsGroupsTasksArray[0] !== ''){
            await User.update(
                {_id: {$in: projectUsersIds.split(',')}},
                {$pullAll: { tasks : projectsGroupsTasks.split(',')}},
                {multi: true}
            );
        }
        if(projectPlannedTimeArray[0] !== ''){
                await User.update(
                    {_id: {$in: projectUsersIds.split(',')}},
                    {$pullAll: { plannedtime : projectPlannedTimeArray}},
                    {multi: true}
                );
        }
        if(projectTimeArray[0] !== ''){
                await User.update(
                    {_id: {$in: projectUsersIds.split(',')}},
                    {$pullAll: { time : projectTimeArray}},
                    {multi: true}
                );
        }
        if(groupPlannedTimeArray[0] !== ''){
            await User.update(
                {_id: {$in: projectUsersIds.split(',')}},
                {$pullAll: { plannedtime : groupPlannedTimeArray}},
                {multi: true}
            );
        }
        if(groupTimeArray[0] !== ''){
            await User.update(
                {_id: {$in: projectUsersIds.split(',')}},
                {$pullAll: { time : groupTimeArray}},
                {multi: true}
            );
        }
        //TEAM
        if(projectsTeamId){
            await Team.update(
                {_id: projectsTeamId },
                { $pull: { projects: projectToRemoveId } },
                {multi: true}
            );
        }
        if(projectsTeamId){
            await Team.update(
                {_id: projectsTeamId },
                {$pullAll: { groups : projectsGroups.split(',')}},
                {multi: true}
            );
        }
        if(projectsGroupsTasksArray[0] !== ''){
            await Team.update(
                {_id: projectsTeamId },
                {$pullAll: { tasks : projectsGroupsTasks.split(',')}},
                {multi: true}
            );
        }
        //PROJECT
        //need to delete projects milestones
        //need to delete projects comments
        //need to delete projects requirements
        if(projectsGroupsTasksArray[0] !== ''){
            await Task.remove(
                {_id: {$in: projectsGroupsTasks.split(',')}},
            );
        }
        if(projectPlannedTimeArray[0] !== ''){
            await PlannedTime.remove(
                    {_id: {$in: projectPlannedTime.split(',')}},
                );
        }
        if(projectTimeArray[0] !== ''){
            await Time.remove(
                {_id: {$in: projectTime.split(',')}},
            );
        }
        //GROUPS
        if(projectsGroupsTasksArray[0] !== ''){
            await Group.remove(
                {_id: {$in: projectsGroupsTasks.split(',')}},
            );
        }
        if(groupPlannedTimeArray[0] !== ''){
            await PlannedTime.remove(
                    {_id: {$in: groupPlannedTimeArray}},
                );
        }
        if(groupTimeArray[0] !== ''){
            await Time.remove(
                {_id: {$in: groupTimeArray}},
            );
        }
        //defaults
        if(projectToRemoveId && teamsDefaultProject === projectToRemoveId){
            await Team.findByIdAndUpdate(projectsTeamId, {
                    $set: {
                        defaultproject: newDefaultProject
                    }
                },
                {new: true}
            );
        }
        if(projectToRemoveId && teamsDefaultProject === projectToRemoveId){
            await User.findByIdAndUpdate(userId, {
                    $set: {
                        defaultgroup: newDefaultProjectgroup,
                        defaultproject: newDefaultProject
                    }
                },
                {new: true}
            );
        }
        if(projectToRemoveId && teamsDefaultProject === projectToRemoveId){
            await Project.findByIdAndUpdate(newDefaultProject, {
                    $set: {
                        defaultgroup: newDefaultProjectgroup,
                    }
                },
                {new: true}
            );
        }
        if(projectsGroups){
            await Group.remove(
                {_id: {$in: projectsGroups.split(',')}},
            );
        }
        await Project.deleteOne(
            {_id: projectToRemoveId },
        );
    },
    removeTeamUser: async (parent, {_id, user, projectId}, {Team}) => {
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
