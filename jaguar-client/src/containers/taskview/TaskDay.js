import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Segment, Transition, Dimmer, Loader} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import {tasksByDay, tasksToday} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';

const token = localStorage.getItem('token');

class TaskDay extends Component {

    render() {
        const { day } = this.props;
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
                            <Header>{day}</Header>
                            <TaskForm
                                taskcurrentowner={user._id}
                                plandate={day}
                                updateQuery={tasksByDay}
                                variables={variables}
                            />
                            <Transition.Group
                                as={List}
                                duration={200}
                                divided
                                relaxed
                                size='large'
                                style={{overflowY: 'auto', overflowX: 'hidden', minHeight: '300px', maxHeight: '325px'}}
                            >
                                {data.tasksByDay.map(({_id, tasktitle}) => (
                                    <TaskItem
                                        key={_id}
                                        taskId={_id}
                                        tasktitle={tasktitle}
                                        completeddate={today}
                                        updateQuery={tasksByDay}
                                        variables={variables}
                                        userId={user._id}
                                        date={today}
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