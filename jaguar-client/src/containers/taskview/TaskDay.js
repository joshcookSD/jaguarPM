import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List, Transition, Dimmer, Loader} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import styled from 'styled-components';
import {tasksByDay} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';

const token = localStorage.getItem('token');

const TaskDayGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
`;

class TaskDay extends Component {

    render() {
        const { day, defaultgroup, defaultproject, defaultteam } = this.props;
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { user } = decode(token);
        const variables = {taskcurrentowner: user._id, iscompleted: false, plandate: day};
        return(
            <Query query={tasksByDay} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <TaskDayGroup>
                            <TaskGroupHeader>{moment.utc(day).format('dddd')}, {moment.utc(day).format('MM/DD')}</TaskGroupHeader>
                            <TaskForm
                                taskcurrentowner={user._id}
                                plandate={day}
                                defaultgroup={defaultgroup}
                                defaultproject={defaultproject}
                                team={defaultteam}
                                updateQuery={tasksByDay}
                                variables={variables}
                            />
                            <Transition.Group
                                as={List}
                                duration={200}
                                relaxed
                                size='large'
                                style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '1em', marginTop: 0, minHeight: '300px', maxHeight: '325px'}}
                            >
                                {data.tasksByDay.map(({_id, tasktitle, duedate, group, project, team, tasktime}) => (
                                    <TaskItem
                                        key={_id}
                                        taskId={_id}
                                        tasktitle={tasktitle}
                                        duedate={duedate}
                                        grouptitle={group.grouptitle}
                                        projecttitle={project.projecttitle}
                                        teamtitle={team.teamtitle}
                                        completeddate={today}
                                        updateQuery={tasksByDay}
                                        variables={variables}
                                        userId={user._id}
                                        date={today}
                                        time={tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                                    />
                                ))
                                }
                            </Transition.Group>
                        </TaskDayGroup>;
                }
                }
            </Query>
        )
    }
}



export default TaskDay;