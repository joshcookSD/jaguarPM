import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import { Dropdown } from 'semantic-ui-react'

const updateTaskTeam = gql`
mutation updateTaskTeam($_id: String, $team: String, $project: String, $group: String) {
    updateTaskTeam(_id: $_id, team: $team, project: $project, group: $group) {
         _id
        tasktitle
        taskdescription
        taskstatus
        iscompleted
        plandate
        duedate
        completeddate
        createdAt
        priority {
          _id
          priority
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
          users {
            _id
            username  
          }
          projects {
            _id
            projecttitle
            groups {
              _id
              grouptitle
            }
          }
        }
        taskcurrentowner {
          _id
          username
        }
      }
}`;

class TeamTaskDropDown extends Component {

    render() {
        const {
            options,
            taskId,
            teamDetails,
        } = this.props;
        console.log(options);
        return (
            <div className="dropDownDiv">
                <Mutation mutation={updateTaskTeam}>
                    {(updateTaskTeam) => {
                        return (
                            <Dropdown text={teamDetails.teamtitle}  fluid scrolling floating labeled button className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header content='New Team' />
                                    {options.map((option, i) =>
                                        <Dropdown.Item
                                            key={i}
                                            value={option._id}
                                            text={option.teamtitle}
                                            {...option}
                                            onClick={ e => {
                                                e.preventDefault();
                                                updateTaskTeam({
                                                    variables: {
                                                        _id: taskId,
                                                        team: option._id,
                                                        project: option.defaultproject._id,
                                                        group: option.defaultproject.defaultgroup._id
                                                    },
                                                    update: async (store, {data: {updateTaskTeam}}) => {
                                                        const { task } = store.readQuery({query: this.props.updateQuery, variables: this.props.refreshVariables});
                                                        task.team = option;
                                                        task.project = option.defaultproject;
                                                        task.group = option.defaultproject.defaultgroup;
                                                        await store.writeQuery({
                                                            query: this.props.updateQuery,
                                                            variables: this.props.refreshVariables,
                                                            data: { task }
                                                        });
                                                    }
                                                });
                                                this.props.closeTeam();
                                            }}
                                        />
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    }}
                </Mutation>
             </div>

        );
    }
}


export default TeamTaskDropDown