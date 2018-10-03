import React, {Component} from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import ProjectAddTime from "./ProjectAddTime";
import ProjectAddPlannedTime from "./ProjectAddPlannedTime";

const ModalHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

class ProjectTimeModal extends Component {
    state = {
        open: false,
        hovering: false
    };
    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    onEnter = () => this.setState({ hovering: true });
    onExit = () => this.setState({ hovering: false });


    render () {
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
                    <Modal.Header>Add Time To Project</Modal.Header>
                    <Modal.Content >
                        <ProjectAddTime selectedProject={this.props.selectedProject} onClose={this.close}/>
                        <ProjectAddPlannedTime selectedProject={this.props.selectedProject} onClose={this.close}/>
                    </Modal.Content>
                </Modal>
            </ModalHeaderWrapper>
        )
    }
}

export default ProjectTimeModal;