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

const teamUsers = gql`
query team($_id: String){
  team(_id: $_id) {
    _id
    users {
      _id
      username
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

const CREATE_ORG = gql`
    mutation createOrganization( $orgtitle: String!, $orgdescription: String, $owner: String!) {
        createOrganization(orgtitle: $orgtitle, orgdescription: $orgdescription, owner: $owner) {
            ok
            errors {
                path
                message
            }
        }
    }`;

export { teamsByUser, addTeamUser, CREATE_ORG, teamUsers };