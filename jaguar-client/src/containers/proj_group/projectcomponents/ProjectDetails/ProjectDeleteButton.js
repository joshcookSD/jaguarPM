import React, {Component} from 'react';
import { Dimmer, Loader, Form, Button, Card } from 'semantic-ui-react';
import { Query } from "react-apollo";
import {removeProjectFromTeam, updateProject, userProjectGroups,} from "../../../apollo-graphql/groupProjectQueries";
import TeamLeaderDropDown from "./TeamLeaderDropDown"
import moment from 'moment';
import { Mutation } from "react-apollo";
import {GroupFormWrapper} from '../../../layout/Proj_GroupComponents.js'
import ProjectTeamDropDown from './ProjectTeamDropDown.js'
import gql from "graphql-tag";

const projectDetails = gql`
query project($_id: String!) {
    project(_id: $_id) {
        _id
        projecttitle
        projectdescription
        plannedcompletiondate
        projectplannedtime{
            _id
            time
        }
        projecttime{
            _id
          time
        }
        duedate
        users{
            _id
            username
        }
        defaultgroup {
            _id
            grouptitle
        }
        leader {
            _id
            username
        }    
        team {
            _id
            defaultproject{
                _id
            }
            teamtitle
            projects{
                _id
                groups{
                    _id
                }
            }
            organization{
                _id
            }
            users{
                _id
                username
            }
        }
        groups{
            _id
            grouptitle
            groupdescription
            iscompleted
            groupplannedtime{
                  _id
                  time
                }
            grouptime{
                _id
                time
            }
            tasks {
              _id
              iscompleted
              tasktitle
              taskdescription
              taskplannedtime{
                time
              }
              tasktime{
                time
                    user{
                    username
                        time{
                            time
                        }
                    }
                }
              group{
                _id
                }
              __typename
            }
        }
    }
}`;

class ProjectDetail extends Component {

    state = {
        projectId: '',
        title: '',
        titleInput: false,
        descriptionInput: false,
        description: '',
        planDateInput: false,
        plandate: '',
        dueDateInput: false,
        duedate: '',
        leaderInput: false,
        leader: '',
        teamInput: false,
        team:'',
        teamChangeInput:false,
        teamLeaderDropDownInput:false,
    };

    closeAssignedLeaderDropDown = () => {
        this.setState({teamLeaderDropDownInput: false})
    };

    render() {

        const {
            userId,
            data
        } = this.props;

            return (
                <Mutation mutation={removeProjectFromTeam}>
                    {(removeProjectFromTeam, { loading }) => {
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader/>
                                </Dimmer>
                            </div>
                        );
                        return (
                            <Button size='small' basic color='red'
                                onClick={async e => {
                                    e.preventDefault();
                                    let arr = data.project.groups.map(group => group.grouptime.map(gt => gt._id));
                                    let allGroupTimeIds = [].concat.apply([], arr);
                                    let groupPlannedTimeArrays = data.project.groups.map(group => group.groupplannedtime.map(gpt => gpt._id))
                                    let allGroupPlannedTimeIds = [].concat.apply([], groupPlannedTimeArrays);
                                    const newDefualtProjectArray = data.project.team.projects.filter(project => project._id !== data.project.team.defaultproject._id);
                                    if(newDefualtProjectArray.length === 0){
                                        alert('cant must have one project in each team')
                                    }else {
                                        await removeProjectFromTeam({
                                            variables: {
                                                //users
                                                userId: userId,
                                                projectUsersIds: data.project.users.map((user) => user._id).toString(),
                                                //team
                                                projectsTeamId: data.project.team._id,
                                                //project
                                                projectToRemovesTasks:data.project.tasks.map(task => task._id),
                                                projectToRemoveId: data.project._id,
                                                projectPlannedTime: data.project.projectplannedtime.map(ppt => ppt._id).toString(),
                                                projectTime: data.project.projecttime.map(pt => pt._id).toString(),
                                                //group
                                                projectsGroups: data.project.groups.map((group) => group._id).toString(),
                                                projectsGroupsTasks: data.project.groups.map((group) => group.tasks.map((task) => task._id)).toString(),
                                                groupPlannedTime: allGroupPlannedTimeIds.toString(),
                                                groupTime: allGroupTimeIds.toString(),
                                                //defaults
                                                newDefaultProject: newDefualtProjectArray[0]._id,
                                                newDefaultProjectgroup: newDefualtProjectArray["0"].groups["0"]._id,
                                                teamsDefaultProject: data.project.team.defaultproject._id,
                                            },
                                            // refetchQueries: [
                                            //     {
                                            //         query: userTaskDetails,
                                            //         variables: variables
                                            //     },
                                            //     {
                                            //         query: userProjectGroups,
                                            //         variables: variables
                                            //     }
                                            // ]
                                        });
                                    }
                                    this.props.removeProjectSwitchForDefault()
                                }}>remove</Button>
                        )
                    }}
                </Mutation>
            )
    }
}

export default ProjectDetail