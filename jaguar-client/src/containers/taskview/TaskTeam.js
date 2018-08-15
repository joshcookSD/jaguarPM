import React, {Component} from 'react';
import { List, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
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
        const { teamtitle, teamId, defaultgroup, defaultproject, taskSelected, tasks, updateQuery, variables, currentTask } = this.props;
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const teamPlan = tasks.filter(task => { return task.taskcurrentowner === null && !task.iscompleted });

        return(
            <TaskTeamGroup>
                <TaskGroupHeader>{teamtitle}</TaskGroupHeader>
                <TaskForm
                    defaultteam={teamId}
                    defaultgroup={defaultgroup}
                    defaultproject={defaultproject}
                    updateQuery={updateQuery}
                    variables={variables}
                    clearTask={this.props.selectTask}
                />
                <Transition.Group
                    as={List}
                    duration={200}
                    divided
                    relaxed
                    size='large'
                    style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '1em', marginTop: 0, minHeight: '300px', maxHeight: '325px'}}
                >
                    {teamPlan.map((task) => (
                        <TaskItem
                            key={task._id}
                            taskId={task._id}
                            tasktitle={task.tasktitle}
                            duedate={task.duedate}
                            groupId={task.group._id}
                            grouptitle={task.group.grouptitle}
                            projectId={task.project._id}
                            projecttitle={task.project.projecttitle}
                            teamtitle={task.team.teamtitle}
                            completeddate={today}
                            updateQuery={updateQuery}
                            variables={variables}
                            userId={user._id}
                            date={today}
                            time={task.tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                            planTime={task.taskplannedtime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                            currentTask={currentTask ? currentTask._id : ''}
                            taskSelected={taskSelected}
                            selectTask={this.props.selectTask}
                        />
                    ))
                    }
                </Transition.Group>
            </TaskTeamGroup>
        )
    }
}

export default TaskTeam;