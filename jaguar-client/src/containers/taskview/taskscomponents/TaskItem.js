import React, {Component} from 'react';
import { List, Divider } from 'semantic-ui-react';
import moment from 'moment';
import styled from 'styled-components';
import TaskComplete from './TaskComplete'
import TaskDetail from '../TaskDetail'
import TaskTime from './TaskTime'
import TaskComments from './TaskComments'
import TaskActions from './TaskActions'

const TaskContent = styled.div`
    line-height: 2em;
    font-size: .8em;
    color: rgba(0,0,0,.7);
    text-align: left;
`;

class TaskItem extends Component {
    state = {
        timeOpen: false,
        detail: false,
        isHovering: false,
        commentOpen: false,
    };

    componentWillReceiveProps(nextProps){
        if(this.props.taskSelected !== nextProps.taskSelected){
            this.setState({
                timeOpen: false,
                detail: false,
                commentOpen: false,
            });
        }
    }

    closeTime = async () => {
        await this.props.selectTask(this.props.taskId);
        this.setState({ timeOpen: !this.state.timeOpen });
    };
    openDetail = async () => {
        await this.props.selectTask(this.props.taskId);
        this.setState({ detail: !this.state.detail});
    };
    openComment = async () => {
        await this.props.selectTask(this.props.taskId);
        this.setState({ commentOpen: !this.state.commentOpen});
    };

    render() {
        const {taskId, tasktitle, groupId, projectId, teamId, userId, completeddate, variables, updateQuery, duedate, plandate, projecttitle, time, planTime, currentTask, queryType} = this.props;
        const { timeOpen, detail, isHovering, commentOpen } = this.state;
        const active = isHovering ? '1px solid rgba(0,0,0,0.2)': 'none';
        const style = {
            overflowX: 'auto',
            width: '100%',
            paddingBottom: '0.3em',
            paddingTop: '0.2em',
            borderTop: active,
        };

        return(
            <List.Item
                key={taskId}
                onMouseEnter={() => { this.setState({isHovering: true}) }}
                onMouseLeave={() => { this.setState({isHovering: false}) }}
                style={style}
            >
                <TaskComplete
                    _id={taskId}
                    userId={userId}
                    completeddate={completeddate}
                    updateQuery={updateQuery}
                    variables={variables}
                    duedate={duedate}
                    plandate={plandate}
                    isComplete={false}
                    group={groupId}
                    queryType={queryType}
                />
                <List.Content style={{width: '100%'}}>

                    <List.Header as='a'>{tasktitle}</List.Header>
                    <TaskContent>
                        {projecttitle ? `${projecttitle} `: ``}
                        {duedate ? `| due: ${moment.utc(duedate).format('MM/DD')} `: ``}
                        {isHovering && <TaskActions
                            closeTime={this.closeTime}
                            openDetail={this.openDetail}
                            openComment={this.openComment}
                            taskId={taskId}
                            userId={userId}
                            currentTask={currentTask}
                            updateQuery={updateQuery}
                            variables={variables}
                        />}
                    </TaskContent>
                </List.Content>

                { detail && (<TaskDetail userId={userId} taskId={taskId} tasktitle={tasktitle} updateQuery={updateQuery} refreshVariables={variables} />)}
                { timeOpen && (<TaskTime userId={userId} taskId={taskId} group={groupId} project={projectId} team={teamId} date={completeddate} closeTime={this.closeTime} time={time} planTime={planTime} updateQuery={updateQuery} refreshVariables={variables}/>)}
                { commentOpen && (<TaskComments taskId={taskId} userId={userId}/>)}
                { (detail || timeOpen || commentOpen) && (<Divider fitted />)}
            </List.Item>
        )
    }
}



export default TaskItem;