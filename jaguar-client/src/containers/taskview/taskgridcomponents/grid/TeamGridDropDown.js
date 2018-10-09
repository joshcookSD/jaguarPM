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

        return (
            <div className="dropDownDiv">
                <Mutation mutation={updateTaskTeam}>
                    {(updateTaskTeam) => {
                        return (
                            <Dropdown text={teamDetails.teamtitle}  fluid icon={null}>
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
                                                        const { user } = store.readQuery({query: this.props.updateQuery, variables: this.props.refreshVariables});
                                                        const teamTask = user.tasks.find(task => task._id === taskId );
                                                        teamTask.team = option;
                                                        teamTask.project = option.defaultproject;
                                                        teamTask.group = option.defaultproject.defaultgroup;
                                                        user.tasks.map(task => teamTask._id === task._id ? teamTask : task);
                                                        await store.writeQuery({
                                                            query: this.props.updateQuery,
                                                            variables: this.props.refreshVariables,
                                                            data: { user }
                                                        });
                                                    }
                                                });
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