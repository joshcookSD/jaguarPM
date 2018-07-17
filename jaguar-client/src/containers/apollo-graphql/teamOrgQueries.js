import gql from "graphql-tag";

const removeTeamFromOrg = gql`
  mutation removeTeamFromOrg(
    $teamId: String 
    $orgId : String 
    $userId: String
    $projects: String
    $users: String
    $tasks: String
    $groups: String
  ){ removeTeamFromOrg (
    teamId : $teamId,
    orgId : $orgId, 
    userId : $userId,
    projects : $projects,
    users : $users,
    tasks : $tasks,
    groups : $groups
  )  {
  orgtitle
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
  }`;

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

const createOrg = gql`
    mutation createOrganization( $orgtitle: String!, $orgdescription: String, $owner: String!) {
        createOrganization(orgtitle: $orgtitle, orgdescription: $orgdescription, owner: $owner) {
            ok
            errors {
                path
                message
            }
        }
    }`;

    const removeOrgUser = gql `
    mutation removeOrgUser($_id: String!, $user: String!, $teamId: String ) {
       removeOrgUser(_id: $_id, user: $user, teamId: $teamId) {
           orgtitle
    }
  }`;

const removeTeamUser = gql `
    mutation removeTeamUser($_id: String!, $user: String!, $projectId: String ) {
       removeTeamUser(_id: $_id, user: $user, projectId: $projectId) {
           teamtitle
    }
  }`;

export {
  addTeamUser,
  createOrg,
  teamUsers,
  removeOrgUser,
  removeTeamUser,
  removeTeamFromOrg
};