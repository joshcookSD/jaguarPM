import gql from "graphql-tag";

const removeTeamFromOrg = gql`
  mutation removeTeamFromOrg(
    $teamToDeleteId: String 
    $teamOrgId: String 
    $teamOwnerId: String
    $teamProjects: String
    $teamUsers: String
    $teamGroupsTasks: String
    $teamGroups: String
  ){ removeTeamFromOrg (
     teamToDeleteId: $teamToDeleteId,
     teamOrgId: $teamOrgId, 
     teamOwnerId: $teamOwnerId,
     teamProjects: $teamProjects,
     teamUsers: $teamUsers,
     teamGroupsTasks: $teamGroupsTasks,
     teamGroups: $teamGroups
  )  {
  orgtitle
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

const teamsByOrg = gql`
  query teamsByOrg($organization: String){
    teamsByOrg(organization:$organization) {
            _id
          teamtitle
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

const teamsById = gql`
query teamsById($_id: String){
  teamsById(_id: $_id) {
    _id
    users{
      _id
    }
    projects{
       _id
       projecttitle
      users{
      _id
      }
      groups{
      _id
      }
      team{
        _id
      }
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
     }`;


export {
  addTeamUser,
  createOrg,
  teamUsers,
  removeOrgUser,
  removeTeamUser,
  removeTeamFromOrg,
  teamsByOrg,
  teamsById
};