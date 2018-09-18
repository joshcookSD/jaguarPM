import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import styled from "styled-components";
import {Form, Input} from 'semantic-ui-react';
import TeamTimeDropdown from './TeamTimeDropdown';
import ProjectTimeDropdown from './ProjectTimeDropdown';
import GroupTimeDropdown from './GroupTimeDropdown';
import TaskTimeDropdown from './TaskTimeDropdown';

const createTimeTask = gql`
mutation createTimeTask($time: Float!, $timecomment: String, $date: Date, $task:String, $user: String, $group: String, $project: String, $team: String) {
    createTimeTask(time: $time, timecomment:$timecomment, date: $date, task: $task, user: $user, group: $group project: $project, team: $team ) {
        _id
        time
        date
        task {
            _id
            tasktitle
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
    }
}`;

const TaskTimeLayout = styled.div`
    background-color: rgb(255,255,255);
    border-radius: .3em;
    display: flex;
    flex-direction: column;
    transition: box-shadow .1s ease;
    box-sizing: inherit;
    font-size: 1rem;
    line-height: 1.15em;
    position: relative;
    padding: .5em 1em;
`;

class TimeForm extends Component {
    state = {
        actualtime: '',
        comment: '',
        check: false,
        timeTeam: this.props.defaultteam,
        timeProject: this.props.defaultproject,
        timeGroup: this.props.defaultgroup,
        timeTask: {},
    };

    selectTeam = async (team) => {
        await this.setState({
            timeTeam: team,
            timeProject: team.defaultproject,
            timeGroup: team.defaultgroup,
        });
    };

    selectProject = async (project) => {
        await this.setState({
            timeProject: project,
            timeGroup: project.defaultgroup,
        });
    };

    selectGroup = async (group) => {
        await this.setState({
            timeGroup: group,
            timeTask: {},
        });
    };

    selectTask = async (task) => {
        await this.setState({
            timeTask: task,
        });
    };

    render() {
        const { userId, date, team } = this.props;
        const { actualTime, comment, timeTeam, timeProject, timeGroup, timeTask, projectOptions } = this.state;
        const variables = {_id: userId._id};

        let teamOptions =  (team || []).map(team => ({
                text: team.teamtitle,
                teamtitle: team.teamtitle,
                _id: team._id,
                projects: team.projects,
                defaultproject: team.defaultproject,
                defaultgroup: team.defaultproject.defaultgroup
            }));

        return(
            <Mutation mutation={createTimeTask} >
                {(createTimeTask) => {
                    return (
                        <TaskTimeLayout>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    if(actualTime != null) {
                                        createTimeTask({
                                            variables: {
                                                task: timeTask._id,
                                                user: userId._id,
                                                group: timeGroup._id,
                                                project: timeProject._id,
                                                team: timeTeam._id,
                                                date: date,
                                                time: actualTime,
                                                timecomment: comment
                                            },
                                            update: async (store, {data: {createTimeTask}}) => {
                                                const { user } = store.readQuery({query: this.props.updateQuery, variables: variables});
                                                createTimeTask.date = this.props.date;
                                                user.time.push(createTimeTask);
                                                await store.writeQuery({
                                                    query: this.props.updateQuery,
                                                    variables: variables,
                                                    data: { user }
                                                });
                                            }
                                        });
                                    } else  {alert('Some time would help')}
                                    this.props.onClose();
                                }}>
                                <Form.Field width='fifteen'>
                                <TeamTimeDropdown
                                    teamOptions={teamOptions}
                                    timeTeam={timeTeam}
                                    selectTeam={this.selectTeam}
                                    />
                                </Form.Field>
                                <Form.Field width='fifteen'>
                                <ProjectTimeDropdown
                                    team={timeTeam}
                                    projectOptions={projectOptions}
                                    timeProject={timeProject}
                                    selectProject={this.selectProject}
                                />
                                </Form.Field>
                                <Form.Field width='fifteen'>
                                <GroupTimeDropdown
                                    project={timeProject}
                                    timeGroup={timeGroup}
                                    selectGroup={this.selectGroup}
                                />
                                </Form.Field>
                                <Form.Field width='fifteen'>
                                <TaskTimeDropdown
                                    group={timeGroup}
                                    timeTask={timeTask}
                                    selectTask={this.selectTask}
                                />
                                </Form.Field>
                                <Form.Group inline>
                                    <Form.Field width='5'>
                                        <Input size='mini'
                                               value={actualTime}
                                               type='number'
                                               step='0.25'
                                               placeholder='time'
                                               onChange={e => this.setState({actualTime: e.target.value})}
                                        />
                                    </Form.Field>
                                    <Form.Field width='11'>
                                        <Input size='mini'
                                               value={comment}
                                               type='text'
                                               placeholder='comment'
                                               action={{icon: 'add circle'}}
                                               onChange={e => this.setState({comment: e.target.value})}
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </TaskTimeLayout>
                    )
                }}
            </Mutation>
        )
    }
}

export default TimeForm;