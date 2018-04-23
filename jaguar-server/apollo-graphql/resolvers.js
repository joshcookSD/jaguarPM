const lodash = require('lodash');

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
        TeamQueryResolver
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
        TeamMutationResolver
    );

// final product for graphql resolvers
const resolvers = {
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
    Mutation:
        Mutations,
};

export default resolvers;
