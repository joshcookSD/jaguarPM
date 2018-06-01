import gql from 'graphql-tag';

const addUser = gql`
mutation signup($username: String!, $password: String!, $email: String!) {
  signup(username: $username, password: $password, email: $email) {
    ok
    token
    refreshToken
    user {
        _id
        email
        username
        profileImageUrl
        }
    errors {
      path
      message
    }
  }
}
`;

const getCurrentUser = gql`
    query {
        CurrentUser {
            _id
            email
            username
            profileImageUrl
        }
    }
`;

const loginUser = gql`
    mutation login( $password: String!, $email: String!) {
        login(email: $email, password: $password) {
        ok
        token
        refreshToken
        user {
            _id
            email
            username
            profileImageUrl
            }
        errors {
            path
            message
            }
        }
    }`;

    

const getOrgByOwner = gql`
    query orgByOwner($owner: String ){
    orgByOwner(owner: $owner ){
          _id
      orgtitle
      orgdescription
    	users{
        _id
        username
        profileImageUrl
      }
          teams{
            teamtitle
            teamdescription
          users{
            _id
            username
            profileImageUrl
          }
        }
          owner{
          username
          }
        }
}`;

const teamsByOwner = gql`
    query teamsByOwner($owner: String ){
        teamsByOwner( owner: $owner ){
            _id
            teamtitle
            teamdescription
            users{
                username
                profileImageUrl
            }
            projects{
                _id
                projecttitle
                projectdescription
            }
             groups {
                _id
                grouptitle
                 project{
                    projecttitle
                }
             }
        }
    }`;
    

const allUsers = gql `
{
  allUsers{
      _id
    username
  }
}
`;

const CREATE_TEAM = gql`
    mutation createTeam( $teamtitle: String!, $teamdescription: String, $owner: String, $organization: String!) {
        createTeam(teamtitle: $teamtitle, teamdescription: $teamdescription, owner: $owner, organization: $organization) {
            ok
            errors {
                path
                message
            }
        }
    }`;

const userTeams = gql`
query user($_id: String ){
    user(_id: $_id){
        team {
            _id
            teamtitle 
            projects{
                _id
                projecttitle
            groups{
                _id
                grouptitle
                groupdescription
             }
            }
        }
    }
}`;

const addOrgUser = gql`
    mutation addOrgUser($_id: String $user: String) {
        addOrgUser(_id: $_id, user: $user){
            _id
            orgtitle
            orgdescription
        }
    }`;



export { addOrgUser, addUser, getCurrentUser, loginUser, getOrgByOwner, userTeams, allUsers, teamsByOwner, CREATE_TEAM};