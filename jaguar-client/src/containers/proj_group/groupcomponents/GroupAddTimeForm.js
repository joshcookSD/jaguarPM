import React, {Component} from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import GroupTaskTimeModalForm from './GroupTaskTimeModalForm.js'
import decode from 'jwt-decode';
import moment from 'moment';
const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

class GroupAddTimeForm extends Component {
    state = {
        selectedTask: '' ,
        selectedTaskTitle: ''
    };

    render() {

        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { data } = this.props;
        const { selectedTask,  selectedTaskTitle } = this.state;
        let groupTasks= data.group.tasks.map(task =>  ({ text: task.tasktitle, _id: task._id}));
        let tasktime = (this.props.data.group.tasks || []).map((task) => ((task.tasktime || []).map(task => task.time).reduce((x, y) => x + y, 0)));
        tasktime = tasktime.reduce((x, y) => x + y, 0)
        //total planned hours
        let taskPlannedTime = (this.props.data.group.tasks || []).map((task) => (task.taskplannedtime || []).map(tasktimes => tasktimes.time).reduce((x, y) => x + y, 0));
        taskPlannedTime = taskPlannedTime.reduce((x, y) => x + y, 0)
        //hours left of group

        return (
            <div >
                <Form style={{'paddingLeft' : '1em'}}>
                <Dropdown text={selectedTaskTitle ? selectedTaskTitle : 'choose task'} scrolling floating labeled button className='icon' >
                    <Dropdown.Menu>
                        <Dropdown.Header content='Assign to' />
                        {groupTasks.map((option, i) =>
                            <Dropdown.Item
                                key={i}
                                value={option._id}
                                selection
                                {...option}
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({selectedTask: option._id});
                                    this.setState({selectedTaskTitle: option.text});
                                }}
                            />
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                </Form>
                <GroupTaskTimeModalForm
                    userId={userId}
                    taskId={selectedTask}
                    group={data.group._id}
                    project={data.group.project._id}
                    date={today}
                    onClose={this.props.onClose}
                    time={tasktime}
                    planTime={taskPlannedTime}
                />
            </div>
        );
    }
}

export default GroupAddTimeForm;