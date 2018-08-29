
import React, {Component} from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import GroupAddTimeForm from './GroupAddTimeForm'
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import TaskTime from '../../taskview/taskscomponents/TaskTime.js'

const ModalHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

class GroupTimeModal extends Component {
    state = { open: false };
    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

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
                                name='plus circle'
                                floated='right'
                                size='big'
                                color='green'
                            />
                        </div>
                    }
                >
                    <Modal.Header>Add Time To Group</Modal.Header>
                    <Modal.Content >
                        <GroupAddTimeForm
                            data={data}
                            close={this.close}
                        />
                    </Modal.Content>
                </Modal>
            </ModalHeaderWrapper>
        )
    }
}

export default GroupTimeModal;