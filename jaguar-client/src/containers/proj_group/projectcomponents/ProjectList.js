import React, {Component} from 'react';
import { Query } from "react-apollo";
import {Header, Dimmer, Loader, Modal, Icon, List, Transition, Divider} from 'semantic-ui-react';
import decode from 'jwt-decode';
import { userTeamProjects} from "../../apollo-graphql/groupProjectQueries";
import ProjectItem from './ProjectItem'
import ProjectFormForModal from './ProjectFormForModal.js'

import styled from 'styled-components';

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


class ProjectList extends Component {
    state = {
        open: false,
        teamIdForForm:'',
    };
// getting variables to set first project on load => this parent
    defaultProject = (defaultProjectId, defaultOrg, defualtProjectsGroups, defualtProjectTeam ) => {
        this.props.selectProject(defaultProjectId, defaultOrg, defualtProjectsGroups, defualtProjectTeam)
    };
// for modal setting team id to state to use as variable in form
    captureFormVariables = (teamId) =>{
        this.setState({ teamIdForForm: teamId },
            this.show()
        )
    };
    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {
        const {selectProject } = this.props;
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const variables = {_id: user._id};
        const { open } = this.state;

        return(
            <Query query={userTeamProjects} variables={variables}>
                { ({ loading, error, data }) => {
                    if(data.user && !this.props.isSelected) {
                        this.defaultProject(
                            data.user.team[0].projects[0]._id,
                            data.user.team[0].organization._id,
                            data.user.team[0].projects[0].groups.map(group => group._id),
                            data.user.team[0].projects[0].team._id,
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
                        { (data.user.team || []).map( team => (
                            <div key={team._id}>
                                <Header>
                                    {team.teamtitle}
                                    <Icon
                                        onClick={() => this.captureFormVariables(team._id)}
                                        color='green'
                                        name='add circle'
                                        floated='right'
                                    />
                                </Header>
                                <Modal size='small' open={open} onClose={this.close}>
                                    <Modal.Header>
                                        Create Project
                                    </Modal.Header>
                                    <Modal.Content>
                                        <ProjectFormForModal
                                            teamId={this.state.teamIdForForm}
                                            userId={user._id}
                                            updateQuery={userTeamProjects}
                                            variables={variables}
                                            onClose={this.close}
                                        />
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
                                        team.projects.map( (project, i) => {
                                        return (
                                            <ListItemWrapper style={this.props.selectedProject === project._id ? {backgroundColor : '#c0eaca'} : {}}>
                                                <ProjectItem
                                                    key={i}
                                                    projectId={project._id}
                                                    projecttitle={project.projecttitle}
                                                    projectdescription={project.projectdescription}
                                                    selectProject={selectProject}
                                                />
                                            </ListItemWrapper>
                                        )
                                    })}
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

export default ProjectList;
