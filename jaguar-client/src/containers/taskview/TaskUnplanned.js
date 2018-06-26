import React, {Component} from 'react';
import { List, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import styled from 'styled-components';
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';

const token = localStorage.getItem('token');

const TaskUnplannedGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
`;

class TaskUnplanned extends Component {

    render() {
        const { defaultgroup, defaultproject, defaultteam, currentTask, tasks, updateQuery, variables } = this.props;
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const unPlanned = tasks.filter(task => { return task.plandate === null && !task.iscompleted });

        return(
            <TaskUnplannedGroup>
                <TaskGroupHeader>Backlog</TaskGroupHeader>
                <TaskForm
                    taskcurrentowner={user._id}
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
                            grouptitle={group.grouptitle}
                            projecttitle={project.projecttitle}
                            teamtitle={team.teamtitle}
                            completeddate={today}
                            updateQuery={updateQuery}
                            variables={variables}
                            userId={user._id}
                            date={today}
                            time={tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                            planTime={taskplannedtime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                            currentTask={currentTask}
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