import gql from 'graphql-tag';

const userTeamProjects = gql`
    query user($_id: String ){
    user(_id: $_id){
       team {
           _id
           teamtitle
           organization{
            _id
            orgtitle
            }
           projects {
             _id
             projecttitle
             projectdescription
                groups{
                _id
                grouptitle
                }
             team {
              _id
              organization{
                _id
                orgtitle
              }
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
            ok
            errors {
                path
                message
            }
        }
}`;

const removeProjectFromTeam = gql`
    mutation removeProjectFromTeam(
        $projectToRemoveId: String,
        $projectUsersIds: String,
        $projectsTeamId: String,
        $projectsGroupsTasks: String,
        $projectsGroups: String
    ) { removeProjectFromTeam (
        projectToRemoveId : $projectToRemoveId,
        projectUsersIds : $projectUsersIds,
        projectsTeamId : $projectsTeamId,
        projectsGroupsTasks : $projectsGroupsTasks,
        projectsGroups : $projectsGroups
    )
        {
            teamtitle
      }
}
`;


const removeGroupFromProject = gql`
     mutation removeGroupFromProject(
        $groupToRemoveId: String,
        $groupUsersIds: String,
        $groupsTeamId: String,
        $groupsProjectId: String,
        $GroupsTasks: String
    ) { removeGroupFromProject (
        groupToRemoveId : $groupToRemoveId,
        groupUsersIds : $groupUsersIds,
        groupsTeamId : $groupsTeamId,
        groupsProjectId : $groupsProjectId,
        GroupsTasks : $GroupsTasks
    )
        {
            projecttitle
      }
}
`;


const projectDetails = gql`
query project($_id: String!) {
    project(_id: $_id) {
        _id
        projecttitle
        projectdescription
        plannedcompletiondate
        duedate
        users{
            _id
            username
        }
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
          tasks{
            _id
          }
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
        $projectIdToChange: String,
        $projectsGroupIds: String,
        $projectsTeamId: String,
        $projectToChange: String,
        $targetTeam: String,
        $groupsProjectTeam : String
    ){ updateProject(
        _id: $_id,    
        projecttitle: $projecttitle,
        projectdescription: $projectdescription,
        plannedcompletiondate: $plannedcompletiondate,
        duedate: $duedate,
        leader: $leader, 
        team: $team 
        projectIdToChange: $projectIdToChange,
        projectsGroupIds: $projectsGroupIds,
        projectsTeamId: $projectsTeamId,
        projectToChange: $projectToChange
        targetTeam: $targetTeam
        groupsProjectTeam: $groupsProjectTeam
    ) {
        projecttitle
    }
}`;

const updateGroup = gql`
    mutation updateGroup(
        $_id: String
        $grouptitle: String
        $groupdescription: String
        $plannedcompletiondate: Date
        $duedate: Date
        $targetProject : String
        $groupToChange : String
        $groupUsers : String
        $groupTeam : String
        $groupProject : String
       $groupsProjectTeam: String
       $groupUser: String
    ){ updateGroup(
        _id: $_id,    
        grouptitle: $grouptitle
        groupdescription: $groupdescription
        plannedcompletiondate: $plannedcompletiondate
        duedate: $duedate
        targetProject : $targetProject
        groupToChange : $groupToChange
        groupUsers : $groupUsers
        groupTeam : $groupTeam
        groupProject : $groupProject
        groupsProjectTeam : $groupsProjectTeam
        groupUser: $groupUser
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
            project{
            _id
            team{
            _id
            }
            }
            users{
                _id
            }
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
    removeProjectFromTeam,
    removeGroupFromProject
}