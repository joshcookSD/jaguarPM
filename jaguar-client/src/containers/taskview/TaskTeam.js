import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Segment, Dimmer, Loader, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import { tasksByTeam } from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';

const token = localStorage.getItem('token');

class TaskTeam extends Component {

    render() {
        const { teamtitle, teamId } = this.props;
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
                    return <Segment style={{width: '100%'}}>
                        <Header>Team {teamtitle}</Header>
                        <TaskForm
                            team={teamId}
                            updateQuery={tasksByTeam}
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
                            {data.tasksByTeam.map(({_id, tasktitle, duedate, grouptitle, projecttitle, teamtitle}) => (
                                <TaskItem
                                    key={_id}
                                    taskId={_id}
                                    tasktitle={tasktitle}
                                    duedate={duedate}
                                    grouptitle={grouptitle}
                                    projecttitle={projecttitle}
                                    teamtitle={teamtitle}
                                    completeddate={today}
                                    updateQuery={tasksByTeam}
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



export default TaskTeam;