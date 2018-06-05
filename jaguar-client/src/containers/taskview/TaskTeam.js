import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Dimmer, Loader, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import { tasksByTeam } from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import styled from 'styled-components';

const token = localStorage.getItem('token');

const TaskTeamGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
    margin: 1rem 0;
`;

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
                    return <TaskTeamGroup>
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
                            style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '1em', marginTop: 0, minHeight: '300px', maxHeight: '325px'}}
                        >
                            {data.tasksByTeam.map(({_id, tasktitle, duedate, grouptitle, projecttitle, teamtitle, tasktime}) => (
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
                                    time={tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
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