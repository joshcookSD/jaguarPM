import gql from "graphql-tag";

const teamsByUser = gql`
 query user($_id: String){
  user(_id: $_id) {
    _id
    username
    team {
      _id
      teamtitle
      
    }
  }
}
 `;

const addTeamUser = gql`
    mutation addTeamUser( $_id: String, $user: String!) {
      addTeamUser(user: $user, _id: $_id) {
      teamtitle
      users{
        username
      }
    }
  }`

export { teamsByUser, addTeamUser };