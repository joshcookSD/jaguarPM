import React, {Component} from 'react';
import { List, Button, Icon, Popup } from 'semantic-ui-react';
import moment from 'moment';
import TaskComplete from './TaskComplete'
import TaskDetail from '../TaskDetail'
import TaskTime from './TaskTime'
import TaskComments from './TaskComments'

const style = {
    borderRadius: 3,
    opacity: 0.95,
    padding: '0.5em',
};

class TaskItem extends Component {
    state = {
        timeOpen: false,
        detail: false,
        isHovering: false,
        commentOpen: false,
    };
    closeTime = () => this.setState({ timeOpen: !this.state.timeOpen });

    render() {
        const {taskId, tasktitle, userId, completeddate, variables, updateQuery, duedate, plandate, grouptitle, projecttitle, teamtitle, time} = this.props;
        const { timeOpen, detail, isHovering, commentOpen } = this.state;

        return(
            <List.Item
                key={taskId}
                onMouseEnter={() => { this.setState({isHovering: true}) }}
                onMouseLeave={() => { this.setState({isHovering: false}) }}>
                {isHovering &&
                <List.Content floated='right'>

                    <Button.Group size='mini'>
                        <Popup
                            trigger={<Button icon basic>
                                <Icon name='options' size='large' onClick={() => {
                                    this.setState({detail: !detail})
                                }}/>
                                </Button>}
                            content='details'
                            position='top center'
                            style={style}
                            inverted
                            />
                        <Popup
                            trigger={<Button icon basic>
                                <Icon name='clock' size='large' onClick={() => {
                                    this.setState({timeOpen: !timeOpen})
                                }}/>
                                </Button>}
                            content='time'
                            position='top center'
                            style={style}
                            inverted
                        />
                        <Popup
                            trigger={<Button icon basic>
                                <Icon name='comments outline' size='large' floated='right' onClick={() => {
                                    this.setState({commentOpen: !commentOpen})
                                }}/>
                                </Button>}
                            content='comments'
                            position='top center'
                            style={style}
                            inverted
                        />
                    </Button.Group>
                </List.Content>
                }
                <TaskComplete
                    _id={taskId}
                    completeddate={completeddate}
                    updateQuery={updateQuery}
                    variables={variables}
                    duedate={duedate}
                    plandate={plandate}
                />
                <List.Content>
                    <List.Header as='a'>{tasktitle}</List.Header>
                    <List.Content >
                        {duedate ? `Due: ${moment.utc(duedate).format('MM/DD')} `: ``}
                        {grouptitle ? `Group: ${grouptitle} `: ``}
                        {projecttitle ? `Project: ${projecttitle} `: ``}
                        {teamtitle ? `Team: ${teamtitle} `: ``}
                    </List.Content>
                </List.Content>
                { timeOpen && (<TaskTime userId={userId} taskId={taskId} date={completeddate} closeTime={this.closeTime} time={time} updateQuery={updateQuery} refreshVariables={variables}/>)}
                { detail && (<TaskDetail taskId={taskId} tasktitle={tasktitle} updateQuery={updateQuery} refreshVariables={variables}/>)}
                { commentOpen && (<TaskComments taskId={taskId} userId={userId}/>)}
            </List.Item>
        )
    }
}



export default TaskItem;