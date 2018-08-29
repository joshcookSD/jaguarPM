import React, {Component} from 'react';
import { Query } from "react-apollo";
import {Header, Dimmer, Loader, Modal, Icon, List, Transition, Divider} from 'semantic-ui-react';
import decode from 'jwt-decode';
import { userProjectGroups} from "../../apollo-graphql/groupProjectQueries";
import GroupTaskItem from './GroupTaskItem'
import GroupForm from './GroupForm'
import styled from 'styled-components';

const ModalGroupWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;


const token = localStorage.getItem('token');

class GroupList extends Component {
    state = {
        open: false,
        teamIdForForm:'',
        projectIdForForm:'',
    };

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    captureTeamId = (teamId, projectId) =>{
        this.setState({ teamIdForForm: teamId });
        this.setState({ projectIdForForm: projectId });
        this.show()
    };

    render() {

        const { user } = decode(token);
        const variables = {_id: user._id};
        const { open } = this.state;
        const {selectGroup, isSelected } = this.props;
        return(
            <Query query={userProjectGroups} variables={variables}>
                { ({ loading, error, data }) => {
                    if(data.user && !isSelected) {
                        this.props.selectGroup(
                            data.user.projects[0].groups[0]._id,
                        )
                    }
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>
                    );
                    if (error) return <p>Error :(</p>;
                    return <div>
                        { (data.user.projects || []).map((project, i) => (
                            <div key={project._id}>
                                <Header >
                                    {
                                        <ModalGroupWrapper>
                                            <div>
                                                <div>{` ${project.team.teamtitle} - ${project.projecttitle}`}</div>
                                            </div>
                                            <div><Icon
                                                onClick={() => this.captureTeamId(project.team._id, project._id)}
                                                color='green'
                                                name='add circle'
                                            /></div>
                                        </ModalGroupWrapper>
                                    }
                                </Header>
                                <Modal open={open} onClose={this.close}>
                                    <Modal.Header>
                                        Create Group
                                    </Modal.Header>
                                    <Modal.Content>
                                        <GroupForm
                                            project={this.state.projectIdForForm}
                                            team={this.state.teamIdForForm}
                                            userId={user._id}
                                            updateQuery={userProjectGroups}
                                            queryVariables={variables}
                                            onClose={this.close}/>
                                    </Modal.Content>
                                </Modal>
                                <Transition.Group
                                    as={List}
                                    duration={200}
                                    divided
                                    relaxed
                                    size='large'
                                >
                                    {
                                        project.groups.map((group, i) => {
                                            return (
                                                <GroupTaskItem
                                                    key={group._id}
                                                    groupId={group._id}
                                                    grouptitle={group.grouptitle}
                                                    groupdescription={group.groupdescription}
                                                    selectGroup={selectGroup}
                                                />
                                            )
                                        })
                                    }
                                </Transition.Group>
                                <Divider />
                            </div>
                        ))}
                    </div>;
                }}
            </Query>
        )
    }
}



export default GroupList;

