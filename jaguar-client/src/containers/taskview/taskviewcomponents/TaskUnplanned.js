import React, {Component} from 'react';
import { List, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import styled from 'styled-components';
import TaskForm from '../taskscomponents/TaskForm';
import TaskItem from '../taskscomponents/TaskItem';
import TaskGroupHeader from '../taskscomponents/TaskGroupHeader';

const token = localStorage.getItem('token');

const TaskUnplannedGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
`;

class TaskUnplanned extends Component {

    render() {
        const { defaultgroup, defaultproject, defaultteam, taskSelected, tasks, updateQuery, variables, currentTask, lastDay } = this.props;
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const unPlanned = tasks.filter(task => { return (task.plandate === null || moment(task.plandate).format('YYYY-MM-DD') > lastDay) && !task.iscompleted });

        return(
            <TaskUnplannedGroup>
                <TaskGroupHeader>Backlog</TaskGroupHeader>
                <TaskForm
                    taskcurrentowner={user._id}
                    defaultgroup={defaultgroup}
                    defaultproject={defaultproject}
                    defaultteam={defaultteam}
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
                    {unPlanned.map(({_id, tasktitle, duedate, tasktime, group, project, team, taskplannedtime}) => (
                        <TaskItem
                            key={_id}
                            taskId={_id}
                            tasktitle={tasktitle}
                            duedate={duedate}
                            groupId={group._id}
                            grouptitle={group.grouptitle}
                            projectId={project._id}
                            projecttitle={project.projecttitle}
                            teamId={team._id}
                            teamtitle={team.teamtitle}
                            completeddate={today}
                            updateQuery={updateQuery}
                            variables={variables}
                            userId={user._id}
                            date={today}
                            time={tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                            planTime={taskplannedtime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                            currentTask={currentTask ? currentTask._id : ''}
                            taskSelected={taskSelected}
                            selectTask={this.props.selectTask}
                        />
                    ))
                    }
                </Transition.Group>
        </TaskUnplannedGroup>
        )
    }
}



export default TaskUnplanned;