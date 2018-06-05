import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
import moment from 'moment';
import styled from 'styled-components';
import TaskComplete from './TaskComplete'
import TaskDetail from '../TaskDetail'
import TaskTime from './TaskTime'
import TaskComments from './TaskComments'
import TaskActions from './TaskActions'

const style = {
    position: 'relative'
};

const TaskContent = styled.div`
    line-height: 1.1em;
    font-size: .8em;
    padding-bottom: 5px;
`;

class TaskItem extends Component {
    state = {
        timeOpen: false,
        detail: false,
        isHovering: false,
        commentOpen: false,
    };
    closeTime = () => this.setState({ timeOpen: !this.state.timeOpen });
    openDetail = () => this.setState({ detail: !this.state.detail});
    openComment = () => this.setState({ commentOpen: !this.state.commentOpen});

    render() {
        const {taskId, tasktitle, userId, completeddate, variables, updateQuery, duedate, plandate, grouptitle, projecttitle, teamtitle, time} = this.props;
        const { timeOpen, detail, isHovering, commentOpen } = this.state;
        return(
            <List.Item
                key={taskId}
                onMouseEnter={() => { this.setState({isHovering: true}) }}
                onMouseLeave={() => { this.setState({isHovering: false}) }}
                style={style}
            >
                {isHovering && <TaskActions
                    closeTime={this.closeTime}
                    openDetail={this.openDetail}
                    openComment={this.openComment}
                />}
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
                    <TaskContent>
                        {duedate ? `Due: ${moment.utc(duedate).format('MM/DD')} `: ``}
                        {grouptitle ? `${grouptitle}`: ``}
                        {projecttitle ? `>${projecttitle}`: ``}
                        {teamtitle ? `>${teamtitle}`: ``}
                    </TaskContent>
                </List.Content>

                { detail && (<TaskDetail userId={userId} taskId={taskId} tasktitle={tasktitle} updateQuery={updateQuery} refreshVariables={variables} />)}
                { timeOpen && (<TaskTime userId={userId} taskId={taskId} date={completeddate} closeTime={this.closeTime} time={time} updateQuery={updateQuery} refreshVariables={variables}/>)}
                { commentOpen && (<TaskComments taskId={taskId} userId={userId}/>)}
            </List.Item>
        )
    }
}



export default TaskItem;