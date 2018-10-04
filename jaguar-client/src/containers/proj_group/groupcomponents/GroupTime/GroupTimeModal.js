
import React, {Component} from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import GroupTaskTimeDropDown from "./GroupTaskTimeDropDown";
import moment from "moment/moment";
import GroupAddTime from './GroupAddTime'
import GroupAddPlannedTime from './GroupAddPlannedTime'
import decode from "jwt-decode";
const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

const ModalHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

class GroupTimeModal extends Component {
    state = {
        selectedTask: '' ,
        selectedTaskTitle: '',
        open: false,
        hovering: false
    };
    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    onEnter = () => this.setState({ hovering: true });
    onExit = () => this.setState({ hovering: false });

    onTaskPick = (id, tasktitle) => this.setState({selectedTask: id, selectedTaskTitle: tasktitle});


    render () {
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { data, selectedGroup } = this.props;
        const { selectedTask } = this.state;

        return(
            <ModalHeaderWrapper>
                <Header as='h2'>Time</Header>
                <Modal
                    open={this.state.open}
                    floated='right'
                    onOpen={this.open}
                    onClose={this.close}
                    trigger={
                        <div>
                            <Icon
                                onMouseEnter={this.onEnter}
                                onMouseLeave={this.onExit}
                                name='plus circle'
                                floated='right'
                                size='big'
                                color={this.state.hovering ? 'blue' : 'green'}
                            />
                        </div>
                    }
                >
                    <Modal.Header>Add Time To Group</Modal.Header>
                    <Modal.Content >
                        <GroupTaskTimeDropDown
                            data={data}
                            onClose={this.close}
                            selectedGroup={selectedGroup}
                            onTaskPick={this.onTaskPick}

                        />
                        <GroupAddTime
                            userId={userId}
                            taskId={selectedTask}
                            group={data.group._id}
                            project={data.group.project._id}
                            date={today}
                            onClose={this.close}
                            selectedGroup={selectedGroup}
                        />
                        <GroupAddPlannedTime
                            userId={userId}
                            taskId={selectedTask}
                            group={data.group._id}
                            project={data.group.project._id}
                            date={today}
                            onClose={this.close}
                            selectedGroup={selectedGroup}
                        />
                    </Modal.Content>
                </Modal>
            </ModalHeaderWrapper>
        )
    }
}

export default GroupTimeModal;