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
                            <Header>Today ({moment.utc(today).format('dddd MM/DD')})</Header>
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
                                style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '1em', marginTop: 0}}
                            >
                            {data.tasksToday.map(({_id, tasktitle, duedate, group, project, team, plandate, tasktime}) => (

                                 <TaskItem
                                     key={_id}
                                     taskId={_id}
                                     tasktitle={tasktitle}
                                     duedate={duedate}
                                     plandate={plandate}
                                     grouptitle={group.grouptitle}
                                     projecttitle={project.projecttitle}
                                     teamtitle={team.teamtitle}
                                     completeddate={today}
                                     updateQuery={tasksToday}
                                     variables={variables}
                                     userId={user._id}
                                     date={today}
                                     time={tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
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