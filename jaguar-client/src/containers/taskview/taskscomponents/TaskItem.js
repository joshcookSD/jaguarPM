import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { List } from 'semantic-ui-react';
import TaskComplete from './TaskComplete'
import TaskTime from './TaskTime'

class TaskItem extends Component {
    state = {
        opened: false
    };
    closeTime = () => this.setState({ opened: !this.state.opened });

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
                    <List.Header as='a'><Link to={{ pathname: '/task-detail', state: {taskId: taskId} }}>{tasktitle}</Link></List.Header>
                    <List.Description as='a'>text tbd</List.Description>
                </List.Content>
                { opened && (<TaskTime userId={userId} taskId={taskId} date={completeddate} closeTime={this.closeTime}/>)}
            </List.Item>
        )
    }
}



export default TaskItem;