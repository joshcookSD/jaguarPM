import React, {Component} from 'react';
import { List, Button, Icon } from 'semantic-ui-react';
import TaskComplete from './TaskComplete'
import TaskDetail from '../TaskDetail'
import TaskTime from './TaskTime'
import TaskComments from './TaskComments'

class TaskItem extends Component {
    state = {
        timeOpen: false,
        detail: false,
        isHovering: false,
        commentOpen: false,
    };
    closeTime = () => this.setState({ timeOpen: !this.state.timeOpen });

    render() {
        const {taskId, tasktitle, userId, completeddate, variables, updateQuery} = this.props;
        const { timeOpen, detail, isHovering, commentOpen } = this.state;

        return(
            <List.Item
                key={taskId}
                onMouseEnter={() => { this.setState({isHovering: true}) }}
                onMouseLeave={() => { this.setState({isHovering: false}) }}>
                <List.Content floated='right'>
                    { isHovering &&
                    <Button.Group size='mini'>
                        <Button icon basic>
                            <Icon name='clock' size='large' onClick={() => {
                                this.setState({timeOpen: !timeOpen})
                            }}/>
                        </Button>
                        <Button icon basic>
                            <Icon name='comments outline' size='large' floated='right' onClick={() => {
                                this.setState({commentOpen: !commentOpen})
                            }}/>
                        </Button>
                    </Button.Group>
                    }
                </List.Content>
                <TaskComplete
                    _id={taskId}
                    completeddate={completeddate}
                    updateQuery={updateQuery}
                    variables={variables}
                />
                <List.Content>
                    <List.Header as='a' onClick={() => { this.setState({detail: !detail}) }}>{tasktitle}</List.Header>
                    <List.Description as='a'>text tbd</List.Description>
                </List.Content>
                { timeOpen && (<TaskTime userId={userId} taskId={taskId} date={completeddate} closeTime={this.closeTime}/>)}
                { detail && (<TaskDetail taskId={taskId} tasktitle={tasktitle} updateQuery={updateQuery} refreshVariables={variables}/>)}
                { commentOpen && (<TaskComments taskId={taskId} userId={userId}/>)}
            </List.Item>
        )
    }
}



export default TaskItem;