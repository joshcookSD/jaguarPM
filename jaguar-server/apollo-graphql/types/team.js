import User from "../../models/user";
import Task from "../../models/task";
import Project from "../../models/project";
import {teamError} from "../formatErrors";
import Organization from '../../models/organization';

const TeamType = `
    type Team {
        _id: String
        teamtitle: String!
        teamdescription: String
        owner: User
        users: [User]
        tasks: [Task]
        projects: [Project]
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
    organization: async ({organization}) => {
        return await Organization.findById(organization)
    },
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
                let team = await new Team({
                    teamtitle,
                    teamdescription,
                    owner,
                    organization
                }).save();
                let teamorganization = await Organization.findById(organization);
                teamorganization.team.push(team._id);
                await teamorganization.save();
                return {
                    ok: true,
                    team,
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
};

export {TeamType, TeamMutation, TeamQuery, TeamQueryResolver, TeamNested, TeamMutationResolver};
