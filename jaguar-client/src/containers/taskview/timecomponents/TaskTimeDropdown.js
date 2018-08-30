import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';

class TaskTimeDropdown extends Component {
    state = {
        update: false
    };
    componentWillReceiveProps(nextProps){
        if(this.props.timeTask._id !== nextProps.timeTask._id){
            this.setState({
                update: !this.state.update
            });
        }
    }

    render() {
        const { taskOptions, timeTask} = this.props;
        const _selectTask = (task) => {
            this.setState({selectedTask: task});
            this.props.selectTask(task);
        };

        return(
            <Dropdown text={timeTask.tasktitle}  fluid scrolling floating labeled button className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Header content={taskOptions.length > 0 ? 'Task' : 'No Tasks Currently for this group'} />
                    {(taskOptions || []).map((option, i) =>
                        <Dropdown.Item
                            key={i}
                            value={option._id}
                            {...option}
                            onClick={() => {
                                _selectTask(option);
                            }}
                        />)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default TaskTimeDropdown;