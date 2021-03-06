const lodash = require('lodash');
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

//mongoose models
import User from '../models/user'
import Time from "../models/time";
import PlannedTime from "../models/plannedtime";
import Priority from "../models/priority";
import Project from "../models/project";
import Group from "../models/group";
import Requirement from "../models/requirement";
import Task from "../models/task";
import UsertypeOrg from "../models/usertypeorg";
import Milestone from "../models/milestone";
import Organization from "../models/organization";
import Team from "../models/team";
import Comment from "../models/comment";


//resolver imports from types files
import {UserQueryResolver, UserMutationResolver, UserNested} from "./types/user";
import {TaskQueryResolver, TaskMutationResolver, TaskNested} from "./types/task";
import {TimeQueryResolver, TimeMutationResolver, TimeNested} from "./types/time";
import {PlannedTimeQueryResolver, PlannedTimeMutationResolver, PlannedTimeNested} from "./types/plannedtime";
import {OrganizationQueryResolver, OrganizationMutationResolver, OrganizationNested} from "./types/organization";
import {UserTypeOrgQueryResolver, UserTypeOrgMutationResolver, UserTypeOrgNested} from "./types/usertypeorg";
import {GroupQueryResolver, GroupMutationResolver, GroupNested} from "./types/group";
import {PriorityQueryResolver, PriorityMutationResolver, PriorityNested} from "./types/priority";
import {MilestoneQueryResolver, MilestoneMutationResolver, MilestoneNested} from "./types/milestone";
import {ProjectQueryResolver, ProjectMutationResolver, ProjectNested} from "./types/project";
import {RequirementQueryResolver, RequirementMutationResolver, RequirementNested} from "./types/requirement";
import {TeamQueryResolver, TeamMutationResolver, TeamNested} from "./types/team";
import {CommentQueryResolver, CommentMutationResolver, CommentNested} from "./types/comment";

//Merged Query Resolvers
const Queries =
    lodash.merge(
        UserQueryResolver,
        TaskQueryResolver,
        TimeQueryResolver,
        PlannedTimeQueryResolver,
        OrganizationQueryResolver,
        UserTypeOrgQueryResolver,
        GroupQueryResolver,
        PriorityQueryResolver,
        MilestoneQueryResolver,
        ProjectQueryResolver,
        RequirementQueryResolver,
        TeamQueryResolver,
        CommentQueryResolver
    );

//merged mutation resolvers
const Mutations =
    lodash.merge(
        UserMutationResolver,
        TaskMutationResolver,
        TimeMutationResolver,
        PlannedTimeMutationResolver,
        OrganizationMutationResolver,
        UserTypeOrgMutationResolver,
        GroupMutationResolver,
        PriorityMutationResolver,
        MilestoneMutationResolver,
        ProjectMutationResolver,
        RequirementMutationResolver,
        TeamMutationResolver,
        CommentMutationResolver
    );

// final product for graphql resolvers
const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
    Query:
        Queries,
    User:
        UserNested,
    Task:
        TaskNested,
    Time:
        TimeNested,
    PlannedTime:
        PlannedTimeNested,
    Organization:
        OrganizationNested,
    UserTypeOrg:
        UserTypeOrgNested,
    Group:
        GroupNested,
    Priority:
        PriorityNested,
    Milestone:
        MilestoneNested,
    Project:
        ProjectNested,
    Requirement:
        RequirementNested,
    Team:
        TeamNested,
    Comment:
        CommentNested,
    Mutation:
        Mutations,
};

export default resolvers;
