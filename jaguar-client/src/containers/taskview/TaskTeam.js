import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List, Dimmer, Loader, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import { tasksByTeam } from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import styled from 'styled-components';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';

const token = localStorage.getItem('token');

const TaskTeamGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
`;

class TaskTeam extends Component {

    render() {
        const { teamtitle, teamId, defaultgroup, defaultproject } = this.props;
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const variables = {team: teamId, iscompleted: false};

        return(
            <Query query={tasksByTeam} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <TaskTeamGroup>
                        <TaskGroupHeader>{teamtitle} Team</TaskGroupHeader>
                        <TaskForm
                            team={teamId}
                            defaultgroup={defaultgroup}
                            defaultproject={defaultproject}
                            updateQuery={tasksByTeam}
                            variables={variables}
                        />
                        <Transition.Group
                            as={List}
                            duration={200}
                            divided
                            relaxed
                            size='large'
                            style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '1em', marginTop: 0, minHeight: '300px', maxHeight: '325px'}}
                        >
                            {data.tasksByTeam.map((task) => (
                                <TaskItem
                                    key={task._id}
                                    taskId={task._id}
                                    tasktitle={task.tasktitle}
                                    duedate={task.duedate}
                                    grouptitle={task.group.grouptitle}
                                    projecttitle={task.project.projecttitle}
                                    teamtitle={task.team.teamtitle}
                                    completeddate={today}
                                    updateQuery={tasksByTeam}
                                    variables={variables}
                                    userId={user._id}
                                    date={today}
                                    time={task.tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                                />
                            ))
                            }
                        </Transition.Group>
                    </TaskTeamGroup>;
                }
                }
            </Query>
        )
    }
}



export default TaskTeam;