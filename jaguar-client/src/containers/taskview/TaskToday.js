import React, {Component} from 'react';
import { List, Transition} from 'semantic-ui-react';
import moment from 'moment';
import decode from 'jwt-decode';
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';
import styled from 'styled-components';

const token = localStorage.getItem('token');

const TaskCurrentLayout = styled.div`
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 5px;
    margin: 0;
`;

class TaskToday extends Component {


    render() {
        const {defaultgroup, defaultproject, defaultteam, taskSelected, tasks, updateQuery, variables, currentTask} = this.props;
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const currentTaskExclude = tasks.filter(task => {
            return currentTask ? !task.iscompleted &&
                task._id !== currentTask._id : !task.iscompleted});
        const todaysPlan = currentTaskExclude.filter(task => {
            return moment.utc(task.plandate).format('YYYY-MM-DD') <= today &&
                task.plandate != null });
        return(
             <div>
            <TaskGroupHeader>Today ({moment.utc(today).format('dddd, MM/DD')})</TaskGroupHeader>
            <TaskForm
                taskcurrentowner={user._id}
                plandate={today}
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
                style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '1em', marginTop: 0, height: '100%'}}
            >
                <TaskCurrentLayout/>
                    <span>current task</span>
                { currentTask && !currentTask.iscompleted && <TaskItem
                    key={currentTask._id}
                    taskId={currentTask._id}
                    tasktitle={currentTask.tasktitle}
                    duedate={currentTask.duedate}
                    plandate={currentTask.plandate}
                    groupId={currentTask.group._id}
                    grouptitle={currentTask.group.grouptitle}
                    projectId={currentTask.project._id}
                    projecttitle={currentTask.project.projecttitle}
                    teamtitle={currentTask.team.teamtitle}
                    completeddate={today}
                    updateQuery={updateQuery}
                    variables={variables}
                    userId={user._id}
                    date={today}
                    time={currentTask.tasktime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                    planTime={currentTask.taskplannedtime.map(({time}) => time).reduce((a,b) => (a + b), 0)}
                    currentTask={currentTask ? currentTask._id : ''}
                    taskSelected={taskSelected}
                    selectTask={this.props.selectTask}
                />}
                <TaskCurrentLayout/>
                {todaysPlan.map(({_id, tasktitle, duedate, group, project, team, plandate, tasktime, taskplannedtime}) => {
                        return <TaskItem
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
                            updateQuery={updateQuery}
                            variables={variables}
                            userId={user._id}
                            date={today}
                            time={tasktime.map(({time}) => time).reduce((a, b) => (a + b), 0)}
                            planTime={taskplannedtime.map(({time}) => time).reduce((a, b) => (a + b), 0)}
                            ccurrentTask={currentTask ? currentTask._id : ''}
                            taskSelected={taskSelected}
                            selectTask={this.props.selectTask}
                        />
                })
                }
            </Transition.Group>
        </div>
        )
    }
}



export default TaskToday;