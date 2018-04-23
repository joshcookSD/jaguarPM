import { makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolvers';

//import for schema from type files
import {UserType, UserMutation, UserQuery} from "./types/user";
import {TaskMutation, TaskQuery, TaskType} from "./types/task";
import {TimeMutation, TimeQuery, TimeType} from "./types/time";
import {PlannedTimeMutation, PlannedTimeQuery, PlannedTimeType} from "./types/plannedtime";
import {OrganizationMutation, OrganizationQuery, OrganizationType} from "./types/organization";
import {UserTypeOrgMutation, UserTypeOrgQuery, UserTypeOrgType} from "./types/usertypeorg";
import {GroupMutation, GroupQuery, GroupType} from "./types/group";
import {PriorityMutation, PriorityQuery, PriorityType} from "./types/priority";
import {MilestoneMutation, MilestoneQuery, MilestoneType} from "./types/milestone";
import {ProjectMutation, ProjectQuery, ProjectType} from "./types/project";
import {RequirementMutation, RequirementQuery, RequirementType} from "./types/requirement";
import {TeamMutation, TeamQuery, TeamType} from "./types/team";

//schema for graphql
const typeDefs = `
    ${UserType}
    ${TaskType}
    ${TimeType}
    ${PlannedTimeType}
    ${OrganizationType}
    ${UserTypeOrgType}
    ${GroupType}
    ${PriorityType}
    ${MilestoneType}
    ${ProjectType}
    ${RequirementType}
    ${TeamType}
    
    type Query {
        ${UserQuery}
        ${TaskQuery}
        ${TimeQuery}
        ${PlannedTimeQuery}
        ${OrganizationQuery}
        ${UserTypeOrgQuery}
        ${GroupQuery}
        ${PriorityQuery}
        ${MilestoneQuery}
        ${ProjectQuery}
        ${RequirementQuery}
        ${TeamQuery}
    }
    type Mutation {
        ${TaskMutation}
        ${UserMutation}
        ${TimeMutation}
        ${PlannedTimeMutation}
        ${OrganizationMutation}
        ${UserTypeOrgMutation}
        ${GroupMutation}
        ${PriorityMutation}
        ${MilestoneMutation}
        ${ProjectMutation}
        ${RequirementMutation}
        ${TeamMutation}
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;