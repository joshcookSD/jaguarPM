import React, {Component} from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

class GroupTaskTimeDropDown extends Component {
    state = {
        selectedTask: '' ,
        selectedTaskTitle: ''
    };

    render() {
        const { data } = this.props;
        const { selectedTask, selectedTaskTitle } = this.state;
        let groupTasks= data.group.tasks.map(task =>  ({ text: task.tasktitle, _id: task._id}));

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
            </div>
        );
    }
}

export default GroupTaskTimeDropDown;