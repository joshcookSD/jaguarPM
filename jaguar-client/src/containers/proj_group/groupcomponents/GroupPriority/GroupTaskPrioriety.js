import React, {Component} from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import GroupTaskForModal from './GroupTaskForModal'
import GroupTaskList from './GroupTaskList'

const GroupAddTaskWrapper = styled.div`
    align-self: flex-end;
`;

const ProjectTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 10px;
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
    onEnter = () => this.setState({ hovering: true });
    onExit = () => this.setState({ hovering: false });

    render() {

        const {
            data,
            removeGroupSwitchForDefault,
            queryVariables,
            selectedGroup,
            userId
        } = this.props;

        return (
            <div>
                <ProjectTitleWrapper>
                    <div>Group : {data.group.grouptitle}</div>
                    {
                        data.group.tasks.filter(task => task.iscompleted === true).length === (data.group.tasks).length
                            ? <Icon name='flag checkered' />
                            :<div>Tasks Completed : {data.group.tasks.filter(task => task.iscompleted === true).length} / {data.group.tasks.length}</div>
                    }
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
                                userId={userId}
                                queryVariables={queryVariables}
                                userName={this.props.userName}
                                taskcurrentowner={this.props.userId}
                                group={data.group._id}
                                project={data.group.project._id}
                                team={data.group.project.team._id}
                                teamUsers={data.group.project.team.users.map(user =>  ({ text: user.username, _id: user._id}))}
                                removeGroupSwitchForDefault={removeGroupSwitchForDefault}
                                selectedGroup={selectedGroup}
                            />
                        </Modal.Content>
                    </Modal>
                </ProjectTitleWrapper>
                <GroupTaskList selectedGroup={selectedGroup} userId={userId}/>
            </div>
        )
    }
}

export default GroupTaskPrioriety