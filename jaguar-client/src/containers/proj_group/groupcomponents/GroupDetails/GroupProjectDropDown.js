import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import decode from "jwt-decode";
import gql from "graphql-tag";

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

const userProjectGroups = gql`
    query user($_id: String ){
    user(_id: $_id){
       projects {
        _id
        projecttitle
        projectdescription
        team {
            _id
            teamtitle
        }
        groups {
            _id
            grouptitle
            groupdescription
            project{
                _id
                team{
                    _id
                }
            }
            users{
                _id
            }
            team{
            _id
            teamtitle
            }
        }
       } 
    }
}`;

const updateGroup = gql`
    mutation updateGroup(
        $_id: String
        $grouptitle: String
        $groupdescription: String
        $plannedcompletiondate: Date
        $duedate: Date
        $targetProject : String
        $groupToChange : String
        $groupUsers : String
        $groupTeam : String
        $groupProject : String
       $groupsProjectTeam: String
       $groupUser: String
    ){ updateGroup(
        _id: $_id,    
        grouptitle: $grouptitle
        groupdescription: $groupdescription
        plannedcompletiondate: $plannedcompletiondate
        duedate: $duedate
        targetProject : $targetProject
        groupToChange : $groupToChange
        groupUsers : $groupUsers
        groupTeam : $groupTeam
        groupProject : $groupProject
        groupsProjectTeam : $groupsProjectTeam
        groupUser: $groupUser
    ) {
        grouptitle
    }
}`;

class GroupProjectDropDown extends Component {

    render() {
        const {
            selectedTeamId,
            selectedGroup,
            groupProject,
            closeTeamDropDown
        } = this.props;

        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const variables = {_id: user._id};

        return (
            <Query query={teamsById} variables={{_id: selectedTeamId}}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;
                    const teamOptions = (data.teamsById.projects || []).map(project => ({ text:project.projecttitle, _id: project._id }));
                    return (
                        <div className="dropDownDiv">
                            <Mutation mutation={updateGroup}>
                                {(updateGroup, {loading}) => {
                                    if (loading) return (
                                        <div>
                                            <Dimmer active>
                                                <Loader/>
                                            </Dimmer>
                                        </div>
                                    );
                                    return (
                                        <div>***under construction*****</div>
                                      /*  <Dropdown text={'change project'}   scrolling floating labeled button className='icon'>
                                            <Dropdown.Menu>
                                                <Dropdown.Header content='New Project Leader' />
                                                {teamOptions.map((option, i) =>
                                                    <Dropdown.Item
                                                        key={i}
                                                        value={option._id}
                                                        {...option}
                                                        onClick={async e => {
                                                            e.preventDefault();
                                                            await updateGroup({
                                                                variables: {
                                                                    targetProject: option._id,
                                                                    groupToChange: selectedGroup,
                                                                    groupProject: groupProject,
                                                                },
                                                                update: async (store) => {
                                                                    const data = store.readQuery({query: userProjectGroups, variables: variables });
                                                                     let oldProject =  data.user.projects.find(project => project._id === groupProject);
                                                                     let groupArrayToPush =  oldProject.groups.filter(group => group._id === selectedGroup);
                                                                     //will not work with current setup
                                                                    // groupArrayToPush[0].project._id = option._id;

                                                                     oldProject.groups =  oldProject.groups.filter(group => group._id !== selectedGroup);
                                                                     let newProject =  data.user.projects.find(project => project._id === option._id);

                                                                     newProject.groups.push(groupArrayToPush[0]);

                                                                    await store.writeQuery({
                                                                        query: userProjectGroups,
                                                                        variables: variables,
                                                                        data: data
                                                                    });
                                                                }
                                                            });
                                                            // closeTeamDropDown();
                                                        }}
                                                    />
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown> */
                                    )
                                }}
                            </Mutation>
                        </div>
                    );
                }}
            </Query >
        );
    }
}


export default GroupProjectDropDown