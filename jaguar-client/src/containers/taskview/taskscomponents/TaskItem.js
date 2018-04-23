import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
import TaskComplete from './TaskComplete'
import TaskTime from './TaskTime'

class TaskItem extends Component {
    state = {
        opened: false
    };


    render() {
        const {taskId, tasktitle, userId, completeddate, variables, updateQuery} = this.props;
        const { opened } = this.state;

        return(
            <List.Item key={taskId}>
                <TaskComplete
                    _id={taskId}
                    completeddate={completeddate}
                    updateQuery={updateQuery}
                    variables={variables}
                />
                <List.Icon name='hourglass empty' size='large' verticalAlign='middle' onClick={() => { this.setState({opened: !opened}) }}/>
                <List.Content>
                    <List.Header as='a'>{tasktitle}</List.Header>
                    <List.Description as='a'>text tbd</List.Description>
                </List.Content>
                { opened && (<TaskTime userId={userId} taskId={taskId} date={completeddate} />)}
            </List.Item>
        )
    }
}



export default TaskItem;