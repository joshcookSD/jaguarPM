import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List, Transition, Dimmer, Loader} from 'semantic-ui-react';
import moment from 'moment';
import decode from 'jwt-decode';
import { tasksToday} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';


const token = localStorage.getItem('token');

class TaskToday extends Component {

    render() {
        const {defaultgroup, defaultproject, defaultteam} = this.props;
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
                        <TaskGroupHeader>Today ({moment.utc(today).format('dddd, MM/DD')})</TaskGroupHeader>
                        <TaskForm
                            taskcurrentowner={user._id}
                            plandate={today}
                            defaultgroup={defaultgroup}
                            defaultproject={defaultproject}
                            team={defaultteam}
                            updateQuery={tasksToday}
                            variables={{taskcurrentowner: user._id, iscompleted: false, plandate: today}}
                        />
                        <Transition.Group
                            as={List}
                            duration={200}
                            relaxed
                            size='large'
                            style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '1em', marginTop: 0, height: '100vh'}}
                        >
                            {data.tasksToday.map(({_id, tasktitle, duedate, group, project, team, plandate, tasktime, taskplannedtime}) => (

                                <TaskItem
                                    key={_id}
                                    taskId={_id}
                                    tasktitle={tasktitle}
                                    duedate={duedate}
                                    plandate={plandate}
                                    groupId={group._id}
                                    grouptitle={group.grouptitle}
                                    projectId={project._id}
                                    projecttitle={project.projecttitle}
                                    teamtitle={team.teamtitle}
                                    completeddate={today}
                                    updateQuery={tasksToday}
                                    variables={variables}
                                    userId={user._id}
                                    date={today}
                                    time={tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                                    planTime={taskplannedtime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
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