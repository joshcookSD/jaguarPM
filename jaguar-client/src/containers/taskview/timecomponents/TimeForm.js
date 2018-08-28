import React, {Component} from 'react';
import { graphql, compose } from "react-apollo";
import {createTaskTime } from '../../apollo-graphql/timeQueries';
import styled from "styled-components";
import {Form, Input, Dropdown} from 'semantic-ui-react';
import {userTaskDetails} from "../../apollo-graphql/userQueries";
import TeamTimeDropdown from './TeamTimeDropdown';
import ProjectTimeDropdown from './ProjectTimeDropdown';
import GroupTimeDropdown from './GroupTimeDropdown';
import TaskTimeDropdown from './TaskTimeDropdown';

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
        projectOptions: this.props.defaultteam.projects.map(project => ({
                text: project.projecttitle,
                projecttitle: project.projecttitle,
                _id: project._id,
                groups: project.groups,
                defaultgroup: project.defaultgroup
            })),
        groupOptions: this.props.defaultproject.groups.map(group => ({
            text: group.grouptitle,
            grouptitle: group.grouptitle,
            _id: group._id,
            tasks: group.tasks,
        })),
        taskOptions: this.props.defaultgroup.tasks.map(task => ({
            text: task.tasktitle,
            tasktitle: task.tasktitle,
            _id: task._id,
        })),
    };

    selectTeam = async (team) => {
        await this.setState({
            timeTeam: team,
            timeProject: team.defaultproject,
        });
    };

    createProjectOptions = async (team) => {
        await this.setState({projectOptions: team.projects.map(project => ({
                text: project.projecttitle,
                projecttitle: project.projecttitle,
                _id: project._id,
                groups: project.groups,
                defaultgroup: project.defaultgroup
            }))
        });
        console.log(this.state.projectOptions);
    };

    selectProject = async (project) => {
        await this.setState({
            timeProject: project,
            timeGroup: project.defaultgroup,
        });
    };

    createGroupOptions = async (project) => {
        await this.setState({groupOptions: project.groups.map(group => ({
                text: group.grouptitle,
                grouptitle: group.grouptitle,
                _id: group._id,
                tasks: group.tasks,
            }))
        });
    };

    selectGroup = async (group) => {
        await this.setState({
            timeGroup: group,
            timeTask: {},
        });
    };

    createTaskOptions = async (group) => {
        await this.setState({groupOptions: group.tasks});
    };

    selectTask = async (task) => {
        await this.setState({
            timeTask: task,
        });
    };

    render() {
        const { userId, date, team } = this.props;
        const { actualTime, comment, timeTeam, timeProject, timeGroup, timeTask, projectOptions, groupOptions, taskOptions } = this.state;
        const variables = {_id: userId._id};

        let teamOptions =  (team || []).map(team => ({
                text: team.teamtitle,
                teamtitle: team.teamtitle,
                _id: team._id,
                projects: team.projects,
                defaultproject: team.defaultproject,
                defaultgroup: team.defaultproject.defaultgroup
            }));

        const _addTime = async () => {
            await this.props.addTime({
                variables: {task: timeTask._id, user: userId._id, group: timeGroup._id, project: timeProject._id, team: timeTeam._id, date: date, time: actualTime, timecomment: comment},
                refetchQueries: [{query: userTaskDetails, variables }]
            });
            this.setState({actualTime: '', comment: ''});
        };

        return(
            <TaskTimeLayout>
                <Form
                    onSubmit={async e => {
                        e.preventDefault();
                        if(actualTime != null) { await _addTime() } else{alert('Some time would help')}
                        this.props.onClose();
                    }}>
                    <Form.Field width='fifteen'>
                    <TeamTimeDropdown
                        teamOptions={teamOptions}
                        timeTeam={timeTeam}
                        selectTeam={this.selectTeam}
                        createProjectOptions={this.createProjectOptions}
                        />
                    </Form.Field>
                    <Form.Field width='fifteen'>
                    <ProjectTimeDropdown
                        projectOptions={projectOptions}
                        timeProject={timeProject}
                        selectProject={this.selectProject}
                        createGroupOptions={this.createGroupOptions}
                    />
                    </Form.Field>
                    <Form.Field width='fifteen'>
                    <GroupTimeDropdown
                        groupOptions={groupOptions}
                        timeGroup={timeGroup}
                        selectGroup={this.selectGroup}
                        createTaskOptions={this.createTaskOptions}
                    />
                    </Form.Field>
                    <Form.Field width='fifteen'>
                    <TaskTimeDropdown
                        taskOptions={taskOptions}
                        timeTask={timeTask}
                        selectTask={this.selectTask}
                    />
                    </Form.Field>
                    <Form.Group style={{marginBottom: '2px'}} inline>
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
    }
}

export default compose(
    graphql(createTaskTime,{
        name: 'addTime',
    }),
)(TimeForm);