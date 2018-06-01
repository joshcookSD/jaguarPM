import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Segment, Transition, Dimmer, Loader} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import {tasksByDay} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';

const token = localStorage.getItem('token');

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
                    return <Segment style={{width: '100%'}}>
                            <Header>{moment.utc(day).format('dddd')}, {moment.utc(day).format('MM/DD')}</Header>
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
                        </Segment>;
                }
                }
            </Query>
        )
    }
}



export default TaskDay;