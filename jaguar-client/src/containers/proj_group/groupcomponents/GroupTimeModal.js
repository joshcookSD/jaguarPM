
import React, {Component} from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import GroupAddTimeForm from './GroupAddTimeForm'
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import TaskTime from '../../taskview/taskscomponents/taskdetails/TaskTime.js'

const ModalHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

class GroupTimeModal extends Component {
    state = {
        open: false,
        hovering: false
    };
    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    onEnter = () => this.setState({ hovering: true });
    onExit = () => this.setState({ hovering: false });


    render () {
        const {
            data
        } = this.props;
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
                        <GroupAddTimeForm
                            data={data}
                            onClose={this.close}
                        />
                    </Modal.Content>
                </Modal>
            </ModalHeaderWrapper>
        )
    }
}

export default GroupTimeModal;