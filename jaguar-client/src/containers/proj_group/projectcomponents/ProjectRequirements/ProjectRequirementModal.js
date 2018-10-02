
import React, {Component} from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import ProjectRequirementForm from './ProjectRequirementForm.js'

const ModalHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

class ProjectRequirementModal extends Component {
    state = {
        open: false,
        hovering: false
    };
    open = () => {
        this.setState({ open: true });
        this.props.reqOpen();
    };
    close = () => {
        this.setState({ open: false });
        this.props.reqClose();
    };

    onEnter = () => this.setState({ hovering: true });
    onExit = () => this.setState({ hovering: false });


    render () {
        const { selectedProject } = this.props;

        return(
            <ModalHeaderWrapper>
                <Header as='h2'>Requirements</Header>
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
                    <Modal.Header>add requirement</Modal.Header>
                    <Modal.Content >
                        <ProjectRequirementForm
                            onClose={this.close}
                            selectedProject={selectedProject}
                        />
                    </Modal.Content>
                </Modal>
            </ModalHeaderWrapper>
        )
    }
}

export default ProjectRequirementModal;