import React, {Component} from 'react';
import { List, Transition} from 'semantic-ui-react';
import moment from 'moment';
import decode from 'jwt-decode';
import TaskForm from './taskscomponents/TaskForm';
import TaskItem from './taskscomponents/TaskItem';
import TaskGroupHeader from './taskscomponents/TaskGroupHeader';


const token = localStorage.getItem('token');

class TaskToday extends Component {


    render() {
        const {defaultgroup, defaultproject, defaultteam, currentTask, tasks, updateQuery, variables} = this.props;
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const todaysPlan = tasks.filter(task => { return moment.utc(task.plandate).format('YYYY-MM-DD') <= today && task.plandate != null && !task.iscompleted });
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
                {todaysPlan.map(({_id, tasktitle, duedate, group, project, team, plandate, tasktime, taskplannedtime}) => (
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
        </div>
        )
    }
}



export default TaskToday;