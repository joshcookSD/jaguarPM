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
        }
    }
}`;

export {userTeamProjects, createProject, projectDetails}