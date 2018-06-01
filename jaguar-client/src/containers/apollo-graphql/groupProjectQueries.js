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

const createProject = gql`
mutation createProject(
    $projecttitle: String,
    $projectdescription: String,
    $team: String!,
    $leader: String,
    $users: String
) { createProject(
        projecttitle: $projecttitle,
        projectdescription: $projectdescription,
        team: $team,
        leader: $leader,
        users: $users
        ) {
            _id
            projecttitle
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


const projectDetails = gql`
query project($_id: String!) {
    project(_id: $_id) {
        projecttitle
        projectdescription
        plannedcompletiondate
        duedate
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
         grouptitle
    	 groupdescription
  		 plannedcompletiondate
    	 duedate
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



export {userTeamProjects, createProject, projectDetails, updateProject, userProjectGroups, createGroup, groupDetails}