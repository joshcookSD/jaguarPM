import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Transition, Dimmer, Loader} from 'semantic-ui-react';
import moment from 'moment';
import decode from 'jwt-decode';
import { tasksToday} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';


const token = localStorage.getItem('token');

class TaskToday extends Component {

    render() {

        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const variables = {taskcurrentowner: user._id, iscompleted: false, plandate: today};
        return(
            <Query query={tasksToday} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                            <Header>Today ({moment.utc(today).format('dddd MM/DD')})</Header>
                        <TaskForm
                            taskcurrentowner={user._id}
                            plandate={today}
                            updateQuery={tasksToday}
                            variables={{taskcurrentowner: user._id, iscompleted: false, plandate: today}}
                        />
                            <Transition.Group
                                as={List}
                                duration={200}
                                divided
                                relaxed
                                size='large'
                            >
                            {data.tasksToday.map(({_id, tasktitle, duedate, grouptitle, projecttitle, teamtitle}) => (
                                 <TaskItem
                                     key={_id}
                                     taskId={_id}
                                     tasktitle={tasktitle}
                                     duedate={duedate}
                                     grouptitle={grouptitle}
                                     projecttitle={projecttitle}
                                     teamtitle={teamtitle}
                                     completeddate={today}
                                     updateQuery={tasksToday}
                                     variables={variables}
                                     userId={user._id}
                                     date={today}
                                 />
                            ))
                            }
                            </Transition.Group>
                    </div>;
                }
                }
            </Query>
        )
    }
}



export default TaskToday;