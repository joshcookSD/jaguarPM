import gql from 'graphql-tag';

const userTeamProjects = gql`
    query user($_id: String ){
    user(_id: $_id){
       team {
           _id
           teamtitle
           projects {
             _id
             projecttitle
             projectdescription
             team {
              _id
             }
           } 
       }
    }
}`;

const teamProjects = gql`
    query team($_id: String ){
    team(_id: $_id){     
       _id
       teamtitle
       projects {
         _id
         projecttitle
         defaultgroup {
             _id
             grouptitle
         }
       } 
    }
}`;

const projectGroups = gql`
    query project($_id: String ){
    project(_id: $_id){     
       _id
       projecttitle
       groups {
         _id
         grouptitle
       } 
    }
}`;

const createProject = gql`
mutation createProject(
    $projecttitle: String,
    $projectdescription: String,
    $team: String!,
    $leader: String!,
    $users: String
) { createProject(
    projecttitle: $projecttitle,
    projectdescription: $projectdescription,
    team: $team,
    leader: $leader,
    users: $users
    ) {
        ok
        errors {
            path
            message
        }
    }
}`;

const createGroup = gql`
mutation createGroup(
    $grouptitle: String,
    $groupdescription: String,
    $team: String!,
    $project: String,
    $users: String
) { createGroup(
        grouptitle: $grouptitle,
        groupdescription: $groupdescription,
        team: $team,
        project: $project,
        users: $users
        ) {
            _id
            grouptitle
        }
}`;

const removeProjectFromTeam = gql`
    mutation removeProjectFromTeam(
        $projectGroupTasksComments : String,
        $projectGroupTasks : String,
        $projectGroupTasksTime : String,
        $taskplannedtime : String,
        $groupUsersId : String,
        $projectGroupComments : String,
        $projectGroupGroupTime : String,
        $projectGroupPlannedTime : String,
        $projectGroup : String,
        $projecLevelTasksComments : String,
        $projectlevelTasksTime : String,
        $projectTaskplannedtime : String,
        $projectLevelTasks : String,
        $projectUsersId : String,
        $projectTime : String,
        $projectPlannedTime : String,
        $groupToDeleteId : String,
        $projectId : String,
        $projectTeam : String
    ) { removeProjectFromTeam (
        projectGroupTasksComments : $projectGroupTasksComments,
        projectGroupTasks : $projectGroupTasks,
        projectGroupTasksTime : $projectGroupTasksTime,
        taskplannedtime : $taskplannedtime,
        groupUsersId : $groupUsersId,
        projectGroupComments : $projectGroupComments,
        projectGroupGroupTime : $projectGroupGroupTime,
        projectGroupPlannedTime : $projectGroupPlannedTime,
        projectGroup : $projectGroup,
        projecLevelTasksComments : $projecLevelTasksComments,
        projectlevelTasksTime : $projectlevelTasksTime,
        projectTaskplannedtime : $projectTaskplannedtime,
        projectLevelTasks : $projectLevelTasks,
        projectUsersId : $projectUsersId,
        projectTime : $projectTime,
        projectPlannedTime : $projectPlannedTime,
        groupToDeleteId : $groupToDeleteId,
        projectId : $projectId,
        projectTeam : $projectTeam,
    )
        {
            teamtitle
      }
}
`;


const projectDetails = gql`
query project($_id: String!) {
    project(_id: $_id) {
        projecttitle
        projectdescription
        plannedcompletiondate
        duedate
        defaultgroup {
            _id
            grouptitle
        }
        leader {
            _id
            username
        }    
        team {
            _id
            teamtitle
            users{
                _id
                username
            }
        }
        groups{
          _id
          grouptitle
          groupdescription
        }
    }
}`;

const groupDetails = gql`
query group($_id: String!) {
    group(_id: $_id) {
    _id
    grouptitle
    groupdescription
    plannedcompletiondate
    duedate
        team{
            _id
            teamtitle
        }
        project{
            projecttitle
            _id
        }
        users{
            _id
            username
        }
        tasks{
            _id
            tasktitle
            taskdescription
        }
    }   
}`;

const updateProject = gql`
    mutation updateProject(
        $_id: String,
        $projecttitle: String,
        $projectdescription: String,
        $plannedcompletiondate: Date,
        $duedate: Date,
        $leader: String, 
        $team: String
    ){ updateProject(
        _id: $_id,    
        projecttitle: $projecttitle,
        projectdescription: $projectdescription,
        plannedcompletiondate: $plannedcompletiondate,
        duedate: $duedate,
        leader: $leader, 
        team: $team 
    ) {
        projecttitle
    }
}`;

const updateGroup = gql`
    mutation updateGroup(
        $_id: String,
        $grouptitle: String,
        $groupdescription: String,
        $plannedcompletiondate: Date,
        $duedate: Date,
    ){ updateGroup(
        _id: $_id,    
        grouptitle: $grouptitle,
        groupdescription: $groupdescription,
        plannedcompletiondate: $plannedcompletiondate,
        duedate: $duedate
    ) {
        grouptitle
    }
}`;

const userProjectGroups = gql`
    query user($_id: String ){
    user(_id: $_id){
       projects {
        _id
        projecttitle
        projectdescription
        team {
            _id
            teamtitle
        }
        groups {
            _id
            grouptitle
            groupdescription
            team{
            _id
            teamtitle
            }
        }
       } 
    }
}`;

const createTaskByGroup = gql`
    mutation createTaskByGroup(
        $tasktitle: String,
        $taskdescription: String,
        $iscompleted: Boolean,
        $team: String,
        $project: String,
        $group: String
    ){ createTaskByGroup(
        tasktitle: $tasktitle,    
        taskdescription: $taskdescription,
        iscompleted: $iscompleted,
        team: $team,
        project: $project,
        group: $group
    ) {
        tasktitle,
        taskdescription
    }
}`;

export {
    userTeamProjects,
    createProject,
    projectDetails,
    updateProject,
    userProjectGroups,
    createGroup,
    groupDetails,
    updateGroup,
    createTaskByGroup,
    teamProjects,
    projectGroups,
    removeProjectFromTeam
}