import React, {Component} from 'react';
import { Query } from "react-apollo";
import {Header, Dimmer, Loader, Modal, Icon, List, Transition, Divider} from 'semantic-ui-react';
import decode from 'jwt-decode';
import { userProjectGroups} from "../../../apollo-graphql/groupProjectQueries";
import GroupTaskItem from './GroupTaskItem'
import GroupForm from './GroupForm'
import styled from 'styled-components';

const ModalGroupWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ListItemWrapper = styled.div`
    margin-bottom: 10px;    
    padding-left: 5px;
    padding-right: 5px;
    align-items: center;
 &:hover  {
    background-color: #c0eaca;  
    border-radius: .28571429rem;
  }
`;


const token = localStorage.getItem('token');

class GroupList extends Component {
    state = {
        open: false,
        teamIdForForm:'',
        projectIdForForm:'',
        index:''
    };

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    onEnter = (i) => this.setState({ hovering: true, index: i });
    onExit = () => this.setState({ hovering: false, index: '' });
    captureTeamId = (teamId, projectId) =>{
        this.setState({ teamIdForForm: teamId });
        this.setState({ projectIdForForm: projectId });
        this.show()
    };

    render() {

        const { user } = decode(token);
        const variables = {_id: user._id};
        const { open } = this.state;
        const {selectGroup, isSelected, selectedGroup}  = this.props;
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
                        { (data.user.projects || []).map((project, i) => {
                            const totalGroups = project.groups.length;
                            return (
                                <div key={project._id}>
                                    <Header >
                                        {
                                            <ModalGroupWrapper>
                                                <div>
                                                    <div>{` ${project.team.teamtitle} - ${project.projecttitle}`}</div>
                                                </div>
                                                <div>
                                                    <Icon
                                                        onMouseEnter={() => this.onEnter(i)}
                                                        onMouseLeave={this.onExit}
                                                        onClick={() => this.captureTeamId(project.team._id, project._id)}
                                                        color={this.state.hovering && this.state.index === i ? 'blue' : 'green'}
                                                        name='add circle'
                                                        size='large'
                                                    />
                                                </div>
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
                                                console.log(selectGroup)
                                                return (
                                                     <ListItemWrapper style={group._id === selectedGroup ? {backgroundColor: '#c0eaca'} : {}}>
                                                        <GroupTaskItem
                                                            key={group._id}
                                                            groupId={group._id}
                                                            grouptitle={group.grouptitle}
                                                            groupdescription={group.groupdescription}
                                                            selectGroup={selectGroup}
                                                        />
                                                      </ListItemWrapper>
                                                )
                                            })
                                        }
                                    </Transition.Group>
                                    <Divider />
                                </div>
                            )
                        })}
                    </div>;
                }}
            </Query>
        )
    }
}



export default GroupList;

