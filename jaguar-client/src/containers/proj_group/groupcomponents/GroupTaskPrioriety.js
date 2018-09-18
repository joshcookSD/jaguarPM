import React, {Component} from 'react';
import { Query, Mutation } from "react-apollo";
import { Dimmer, Loader, Checkbox, Icon, Modal, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import {completeTask} from "../../apollo-graphql/taskQueries";
import { groupDetails} from "../../apollo-graphql/groupProjectQueries";
import GroupTaskForModal from './GroupTaskForModal'
import moment from "moment/moment";

const TaskDescript = styled.div`
    padding-left: 10px;
`;

const GroupAddTaskWrapper = styled.div`
    align-self: flex-end;
`;

const TaskTitleAndDescWrapper = styled.div`
    
`;

const InnerGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%
    justify-content: space-between;
`;


const ProjectTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 10px;
`;

const TaskTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    &:hover  {
    background-color: #e6fff1
    border-radius: .28571429rem;
  }
`;
class GroupTaskPrioriety extends Component {

    componentWillUpdate(nextProps) {
        if(nextProps.selectedGroup !== this.props.selectedGroup) {
            this.setState({groupId: nextProps.selectedGroup});
        }
    }

    state = {
        groupId: '',
        taskTimeDropedDown: false,
        taskTimeDropedDownIndex: '',
        hovering: false,
        hoveringSquare: false,
        hoveringSquareindex: ''
    };

    handleClick = (i) => {
        this.setState({taskTimeDropedDown:!this.state.taskTimeDropedDown});
        this.setState({taskTimeDropedDownIndex:i});
    };
    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    onEnter = () => this.setState({ hovering: true });
    onExit = () => this.setState({ hovering: false });

    onEnterSquare = (i) => this.setState({ hoveringSquare: true, hoveringSquareindex: i });
    onExitSquare = () => this.setState({ hoveringSquare: false, hoveringSquareindex: '' });

    render() {

        const {
            userId,
            data,
            removeGroupSwitchForDefault,
            queryVariables
        } = this.props;

        const today = moment(Date.now()).format('YYYY-MM-DD');

        return (
            <Mutation mutation={completeTask}>
                {(completeTask) => {
                    return (
                        <div>
                            <ProjectTitleWrapper>
                                <div>Group : {data.group.grouptitle}</div>
                                {
                                    data.group.tasks.filter(task => task.iscompleted === true).length === (data.group.tasks).length
                                        ? <Icon name='flag checkered' />
                                        :<div>Tasks Completed : {data.group.tasks.filter(task => task.iscompleted === true).length} / {data.group.tasks.length}</div>
                                }
                            </ProjectTitleWrapper>
                            <InnerGroupWrapper>
                                { data.group.tasks.map(task =>
                                    <TaskTitleWrapper>
                                        <div>{task.tasktitle}</div>
                                        {

                                            (task.iscompleted === true)
                                                ?
                                                <div>done!</div>
                                                :
                                                <Checkbox
                                                    radio
                                                    onChange={async e => {
                                                        e.preventDefault();
                                                        await completeTask({
                                                            variables: {
                                                                _id: task._id,
                                                                iscompleted: true,
                                                                completeddate: today,
                                                                groupForTasksId: task.group._id
                                                            },
                                                            refetchQueries:
                                                                [
                                                                    {query: groupDetails, variables: {_id: this.state.groupId}},
                                                                ]
                                                        });
                                                    }}
                                                />
                                        }
                                    </TaskTitleWrapper>
                                )}
                                <Modal
                                    floated='right'
                                    trigger={
                                        <GroupAddTaskWrapper>
                                            <Icon
                                                onMouseEnter={this.onEnter}
                                                onMouseLeave={this.onExit}
                                                name='plus circle'
                                                floated='right'
                                                size='big'
                                                color={this.state.hovering ? 'blue' : 'green'}
                                            />
                                        </GroupAddTaskWrapper>
                                    }
                                >
                                    <Modal.Header>Add Task To Group</Modal.Header>
                                    <Modal.Content >
                                        <GroupTaskForModal
                                            queryVariables={queryVariables}
                                            userName={this.props.userName}
                                            taskcurrentowner={this.props.userId}
                                            group={data.group._id}
                                            project={data.group.project._id}
                                            team={data.group.project.team._id}
                                            teamUsers={data.group.project.team.users.map(user =>  ({ text: user.username, _id: user._id}))}
                                            removeGroupSwitchForDefault={removeGroupSwitchForDefault}
                                        />
                                    </Modal.Content>
                                </Modal>
                            </ProjectTitleWrapper>
                            <InnerGroupWrapper>
                                { data.group.tasks.map((task, i) =>
                                    <TaskTitleWrapper>
                                        <TaskTitleAndDescWrapper onClick={() => this.handleClick(i)}>
                                            <div>{task.tasktitle}</div>
                                            {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) && <TaskDescript>{task.taskdescription}</TaskDescript>}
                                        </TaskTitleAndDescWrapper>
                                        {
                                            (task.iscompleted === true)
                                                ?
                                                <Icon name='check circle' color='green' size='large'/>
                                                :
                                                <Icon
                                                    name='square outline'
                                                    onMouseEnter={() => this.onEnterSquare(i)}
                                                    onMouseLeave={this.onExitSquare}
                                                    color={this.state.hoveringSquare && this.state.hoveringSquareindex === i ? 'blue' : 'green'}
                                                    size='large'
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        await completeTask({
                                                            variables: {
                                                                _id: task._id,
                                                                iscompleted: true,
                                                                completeddate: today,
                                                                groupForTasksId: task.group._id
                                                            },
                                                            refetchQueries:
                                                                [
                                                                    {query: groupDetails, variables: {_id: data.group._id}},
                                                                    // { query: userTaskDetails, variables: {_id: userId}},
                                                                ]
                                                        });
                                                    }}
                                                />
                                        }
                                    </TaskTitleWrapper>
                                )}
                            </InnerGroupWrapper>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default GroupTaskPrioriety