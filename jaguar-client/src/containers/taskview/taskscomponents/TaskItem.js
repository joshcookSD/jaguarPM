import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
import TaskComplete from './TaskComplete'
import TaskDetail from '../TaskDetail'
import TaskTime from './TaskTime'

class TaskItem extends Component {
    state = {
        opened: false,
        detail: false,
    };
    closeTime = () => this.setState({ opened: !this.state.opened });

    render() {
        const {taskId, tasktitle, userId, completeddate, variables, updateQuery} = this.props;
        const { opened, detail } = this.state;

        return(
            <List.Item key={taskId}>
                <TaskComplete
                    _id={taskId}
                    completeddate={completeddate}
                    updateQuery={updateQuery}
                    variables={variables}
                />
                <List.Icon name='clock' size='large' verticalAlign='middle' onClick={() => { this.setState({opened: !opened}) }}/>
                <List.Content>
                    <List.Header as='a' onClick={() => { this.setState({detail: !detail}) }}>{tasktitle}</List.Header>

                    <List.Description as='a'>text tbd</List.Description>
                </List.Content>
                { opened && (<TaskTime userId={userId} taskId={taskId} date={completeddate} closeTime={this.closeTime}/>)}
                { detail && (<TaskDetail taskId={taskId} tasktitle={tasktitle}/>)}
            </List.Item>
        )
    }
}



export default TaskItem;