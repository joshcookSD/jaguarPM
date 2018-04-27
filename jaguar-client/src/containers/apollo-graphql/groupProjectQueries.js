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

export {userTeamProjects}