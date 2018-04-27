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
) { CreateProject(
        projecttitle: $projecttitle,
        projectdescription: $projectdescription,
        team: $team,
        leader: $leader,
        users: $users
        ) {
            _id
            projecttitle
        }
}

`;

export {userTeamProjects, createProject}