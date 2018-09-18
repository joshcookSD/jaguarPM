import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { List, Transition, Loader} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import styled from 'styled-components';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';

const tasksByTeam = gql`
    query team($_id: String){
        team(_id: $_id) {
            _id
            teamtitle
            defaultproject {
                _id
                projecttitle
                defaultgroup {
                _id
                grouptitle
                }
            }
            tasks {
                _id
                tasktitle
                plandate
                iscompleted
                taskcurrentowner {
                    _id
                }
                group {
                    _id
                    grouptitle
                }
                project {
                    _id
                    projecttitle
                }
                tasktime {
                    _id
                    time
                }
                taskplannedtime {
                    _id
                    time
                }
            }
        }
    }
    `;

const token = localStorage.getItem('token');

const TaskTeamGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
`;

class TaskTeam extends Component {

    render() {
        const { teamId, taskSelected, currentTask } = this.props;
        const variables = {_id: teamId};
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');


        return(
            <Query query={tasksByTeam} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Loader/>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    const teamPlan = (data.team.tasks || []).filter(task => { return task.taskcurrentowner === null && !task.iscompleted });
                    return (
                        <TaskTeamGroup>
                            <TaskGroupHeader>{data.team.teamtitle}</TaskGroupHeader>
                            <TaskForm
                                defaultteam={teamId}
                                defaultgroup={data.team.defaultproject.defaultgroup._id}
                                defaultproject={data.team.defaultproject._id}
                                updateQuery={tasksByTeam}
                                variables={variables}
                                queryType={'team'}
                                clearTask={this.props.selectTask}
                            />
                            <Transition.Group
                                as={List}
                                duration={200}
                                divided
                                relaxed
                                size='large'
                                style={{
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    paddingTop: '1em',
                                    marginTop: 0,
                                    minHeight: '300px',
                                    maxHeight: '325px'
                                }}
                            >
                                {teamPlan.map((task) => (
                                    <TaskItem
                                        key={task._id}
                                        taskId={task._id}
                                        tasktitle={task.tasktitle}
                                        duedate={task.duedate}
                                        groupId={task.group._id}
                                        grouptitle={task.group.grouptitle}
                                        projectId={task.project._id}
                                        projecttitle={task.project.projecttitle}
                                        teamId={teamId}
                                        teamtitle={data.team.teamtitle}
                                        completeddate={today}
                                        updateQuery={tasksByTeam}
                                        variables={variables}
                                        queryType={'team'}
                                        userId={user._id}
                                        date={today}
                                        time={task.tasktime.map(({time}) => time).reduce((a, b) => (a + b), 0)}
                                        planTime={task.taskplannedtime.map(({time}) => time).reduce((a, b) => (a + b), 0)}
                                        currentTask={currentTask ? currentTask._id : ''}
                                        taskSelected={taskSelected}
                                        selectTask={this.props.selectTask}
                                    />
                                ))
                                }
                            </Transition.Group>
                        </TaskTeamGroup>
                    )
                }}
            </Query>
        )
    }
}

export default TaskTeam;