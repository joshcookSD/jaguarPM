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
const updatePassword = gql`
mutation updatePassword($username: String!, $newPassword: String!, $email: String!) {
  updatePassword(username: $username, newPassword: $newPassword, email: $email) {
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
             defaultproject{
                _id
                projecttitle
                defaultgroup{
                  grouptitle
                  _id
                }
              }
            organization{
                _id
                orgtitle
              }
              users{
                _id
                username
                profileImageUrl
              }
              projects{
                _id
                projecttitle
              }
              tasks{
                _id
                tasktitle
              }
              groups{
                _id
                grouptitle
                tasks{
                _id
                tasktitle
                }
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
              users{
                _id
              }
              projecttime{
                _id
              }
              projectplannedtime{
                _id
              }
              team{
                _id
              }
              tasks{
                      _id
                      tasktitle
                      taskdescription
                      tasktime{
                        _id
                      }
                      taskplannedtime{
                        _id
                      }
                      tasktime{
                        _id
                      }
                      comments{
                        _id
                      }
                    }
                groups{
                  _id
                  grouptitle
                  groupdescription
                  iscompleted
                  grouptime{
                    _id
                  }
                  comments{
                    _id
                  }
                  groupplannedtime{
                    _id
                  }
                  grouptime{
                    _id
                  }
                    users{
                      _id
                      username
                    }
                    tasks{
                      _id
                      tasktitle
                      taskdescription
                      tasktime{
                        _id
                      }
                      taskplannedtime{
                        _id
                      }
                      tasktime{
                        _id
                      }
                      comments{
                        _id
                      }
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
        currenttask {
            _id
            tasktitle
            duedate
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
        time{
            _id
            time
            date
            task {
                _id
                tasktitle
                tasktime {
                    time
                }
            }
            group {
                _id
                grouptitle
            }
            project {
                _id
                projecttitle
            }
        }    
        tasks {
            _id
            tasktitle
            taskdescription
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
            duedate
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
                projecttitle
                groups{
                    _id
                    grouptitle
                    tasks {
                         _id
                        tasktitle
                    } 
                 }    
                defaultgroup {
                    _id
                    grouptitle
                    tasks {
                         _id
                        tasktitle
                    }
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
                defaultgroup {
                    _id
                    grouptitle
                    tasks {
                         _id
                        tasktitle
                    }
                }
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
                defaultgroup {
                    _id
                    grouptitle
                     tasks {
                         _id
                        tasktitle
                    }
                }
            groups{
                _id
                grouptitle
                groupdescription
                tasks {
                 _id
                tasktitle
                }
             }
            }
        }
        defaultgroup{
            _id
            grouptitle
            tasks {
                 _id
                tasktitle
            }    
        }
        defaultproject{
            _id
            projecttitle
            defaultgroup {
                _id
                grouptitle
                 tasks {
                         _id
                        tasktitle
                }
            }
            groups{
                _id
                grouptitle 
             }    
        }
        defaultteam{
            _id
            teamtitle
            projects{
                _id
                projecttitle
                defaultgroup {
                    _id
                    grouptitle
                     tasks {
                         _id
                        tasktitle
                    }
                }
                groups{
                _id
                grouptitle
                groupdescription
             }
            }
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

const updateCurrentTask = gql`
    mutation  updateCurrentTask($_id: String!, $currenttask: String!, $previoustask: String) {
        updateCurrentTask(_id: $_id, currenttask: $currenttask, previoustask: $previoustask) {
            _id
            currenttask {
                _id
                tasktitle
            }
        }
    }
`;

export {
    addOrgUser,
    addUser,
    getCurrentUser,
    loginUser,
    getOrgByOwner,
    userTeams,
    allUsers,
    teamsByOwner,
    createTeam,
    userTaskDetails,
    userDetails,
    teamsByUser,
    updateCurrentTask,
    updatePassword
};

