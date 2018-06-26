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

const userDetails = gql`
    query user($_id: String!) {
        user(_id: $_id) {
            email
            username
            password
            profileImageUrl
            tasks {
            _id
            tasktitle
            iscompleted
            group {
                _id
                grouptitle
                }
            project {
                _id 
                projecttitle
                }
            team {
                _id
                teamtitle
                }
            plandate
            tasktime {
                _id
                time
                }
            taskplannedtime {
                _id
                time
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
            defaultproject {
                _id
                projecttitle
            }
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

const createTeam = gql`
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
        tasks {
            _id
            tasktitle
            iscompleted
            group {
                _id
                grouptitle
                }
            project {
                _id 
                projecttitle
                }
            team {
                _id
                teamtitle
                }
            plandate
            tasktime {
                _id
                time
                }
            taskplannedtime {
                _id
                time
                }
            }
        team {
            _id
            teamtitle
            defaultproject {
                _id
                defaultgroup {
                _id
                }
            }
            tasks {
                 _id
            tasktitle
            taskdescription
            iscompleted
            taskcurrentowner {
                _id
                username
            }
            group {
                _id
                grouptitle
                }
            project {
                _id 
                projecttitle
                }
            team {
                _id
                teamtitle
                }
            duedate
            plandate
            tasktime {
                _id
                time
                }
            taskplannedtime {
                _id
                time
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



export { addOrgUser, addUser, getCurrentUser, loginUser, getOrgByOwner, userTeams, allUsers, teamsByOwner, createTeam, userTaskDetails, userDetails};