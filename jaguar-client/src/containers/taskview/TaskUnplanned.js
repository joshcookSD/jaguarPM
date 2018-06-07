import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Dimmer, Loader, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import styled from 'styled-components';
import {tasksByUser} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';

const token = localStorage.getItem('token');

const TaskUnplannedGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
`;

class TaskUnplanned extends Component {

    render() {
        const { defaultgroup, defaultproject, defaultteam } = this.props;
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const variables = {taskcurrentowner: user._id, iscompleted: false};

        return(
            <Query query={tasksByUser} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                    <div>
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    </div>);
                    if (error) return <p>Error :(</p>;
                return <TaskUnplannedGroup>
                        <TaskGroupHeader>Backlog</TaskGroupHeader>
                        <TaskForm
                            taskcurrentowner={user._id}
                            defaultgroup={defaultgroup}
                            defaultproject={defaultproject}
                            team={defaultteam}
                            updateQuery={tasksByUser}
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
                            {data.tasksByUser.map(({_id, tasktitle, duedate, tasktime, group, project, team}) => (
                                <TaskItem
                                    key={_id}
                                    taskId={_id}
                                    tasktitle={tasktitle}
                                    duedate={duedate}
                                    grouptitle={group.grouptitle}
                                    projecttitle={project.projecttitle}
                                    teamtitle={team.teamtitle}
                                    completeddate={today}
                                    updateQuery={tasksByUser}
                                    variables={variables}
                                    userId={user._id}
                                    date={today}
                                    time={tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                                />
                            ))
                            }
                        </Transition.Group>
                </TaskUnplannedGroup>;
                }
                }
            </Query>
        )
    }
}



export default TaskUnplanned;