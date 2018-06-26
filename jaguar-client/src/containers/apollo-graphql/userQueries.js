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
    query getOrgByOwner($owner: String ){
    getOrgByOwner(owner: $owner ){
          _id
      orgtitle
      orgdescription
    	users{
        _id
        username
        profileImageUrl
      }
          teams{
            _id
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
                owner{
                  username
                }
            defaultproject {
                _id
                projecttitle
            }
            users{
                _id
                username
                profileImageUrl
            }
             projects{
          _id
          projecttitle
          projectdescription
        	iscompleted
        groups{
          _id
          grouptitle
          groupdescription
          iscompleted
          tasks{
            _id
            tasktitle
            taskdescription
            iscompleted
          }
        }
      }
            tasks{
                _id
                tasktitle
                taskdescription
                iscompleted
                    priority{
                        priority
                    }
            }
        }
    }`;

const teamsByUser = gql`
    query teamsByUser($user: String ){
        teamsByUser( user: $user ){
            _id
            teamtitle
            teamdescription
                owner{
                  username
                }
            defaultproject {
                _id
                projecttitle
            }
            users{
                _id
                username
                profileImageUrl
            }
             projects{
          _id
          projecttitle
          projectdescription
        	iscompleted
        groups{
          _id
          grouptitle
          groupdescription
          iscompleted
          tasks{
            _id
            tasktitle
            taskdescription
            iscompleted
          }
        }
      }
            tasks{
                _id
                tasktitle
                taskdescription
                iscompleted
                    priority{
                        priority
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

const userTaskDetails = gql`
query user($_id: String ){
    user(_id: $_id){
        team {
            _id
            teamtitle
            defaultproject {
                _id
                defaultgroup {
                _id
                }
            }
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
        defaultgroup{
            _id
            grouptitle
        }
        defaultproject{
            _id
            projecttitle
        }
        defaultteam{
            _id
            teamtitle
        }
    }
}`;

const userTeams = gql`
query user($_id: String ){
    user(_id: $_id){
        team {
            _id
            teamtitle
            users {
                _id
                username
                }
            defaultproject {
                _id
                projecttitle
                defaultgroup {
                    _id
                    grouptitle
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



export { addOrgUser, addUser, getCurrentUser, loginUser, getOrgByOwner, userTeams, allUsers, teamsByOwner, CREATE_TEAM, userTaskDetails,teamsByUser};