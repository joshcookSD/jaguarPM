import React, {Component} from 'react';
import { List, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import styled from 'styled-components';
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
        const {day, defaultgroup, defaultproject, defaultteam, currentTask, tasks, updateQuery, variables} = this.props;
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const {user} = decode(token);
        const dayPlan = tasks.filter(task => { return moment.utc(task.plandate).format('YYYY-MM-DD') === day && !task.iscompleted });

        return (
            <TaskDayGroup>
                <TaskGroupHeader>{moment.utc(day).format('dddd')}, {moment.utc(day).format('MM/DD')}</TaskGroupHeader>
                <TaskForm
                    taskcurrentowner={user._id}
                    plandate={day}
                    defaultgroup={defaultgroup}
                    defaultproject={defaultproject}
                    team={defaultteam}
                    updateQuery={updateQuery}
                    variables={variables}
                    clearTask={this.props.selectTask}
                />
                <Transition.Group
                    as={List}
                    duration={200}
                    relaxed
                    size='large'
                    style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingTop: '1em',
                        marginTop: 0,
                        minHeight: '300px',
                        maxHeight: '325px'
                    }}
                >
                    {dayPlan.map(({_id, tasktitle, duedate, group, project, team, tasktime, taskplannedtime}) => (
                        <TaskItem
                            key={_id}
                            taskId={_id}
                            tasktitle={tasktitle}
                            duedate={duedate}
                            grouptitle={group.grouptitle}
                            projecttitle={project.projecttitle}
                            teamtitle={team.teamtitle}
                            completeddate={today}
                            updateQuery={updateQuery}
                            variables={variables}
                            userId={user._id}
                            date={today}
                            time={tasktime.map(({time}) => time).reduce((a, b) => (a + b), 0)}
                            planTime={taskplannedtime.map(({time}) => time).reduce((a, b) => (a + b), 0)}
                            currentTask={currentTask}
                            selectTask={this.props.selectTask}
                        />
                    ))
                    }
                </Transition.Group>
            </TaskDayGroup>
        )
    }
}


export default TaskDay;