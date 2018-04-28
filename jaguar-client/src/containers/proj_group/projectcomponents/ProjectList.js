import React, {Component} from 'react';
import { Query } from "react-apollo";
import {Header, Dimmer, Loader, Modal, Icon, List, Transition, Divider} from 'semantic-ui-react';
import moment from 'moment';
import decode from 'jwt-decode';
import { userTeamProjects} from "../../apollo-graphql/groupProjectQueries";
import ProjectItem from './ProjectItem'
import ProjectForm from './ProjectForm'

const token = localStorage.getItem('token');

class ProjectList extends Component {
    state = { open: false };

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {

        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const variables = {_id: user._id};
        const { open } = this.state;
        return(
            <Query query={userTeamProjects} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                            { (data.user.team || []).map( team => (
                                <div key={team._id}>
                                    <Header >{team.teamtitle}<Icon onClick={this.show} color='green' name='add circle' floated='right'/></Header>

                                    <Modal size='small' open={open} onClose={this.close}>
                                        <Modal.Header>
                                            Create Project
                                        </Modal.Header>
                                        <Modal.Content>
                                            <ProjectForm team={team._id} userId={user._id} updateQuery={userTeamProjects} variables={variables} onClose={this.close}/>
                                        </Modal.Content>
                                    </Modal>
                                    <Transition.Group
                                        as={List}
                                        duration={200}
                                        divided
                                        relaxed
                                        size='large'
                                    >
                                    { team.projects.map(project => {
                                        let projectId = project._id;
                                        return (
                                            <ProjectItem
                                                key={project._id}
                                                projectId={project._id}
                                                projecttitle={project.projecttitle}
                                                projectdescription={project.projectdescription}
                                                onClick={() => this.props.selectProject(projectId)}
                                            />
                                        )})
                                    }
                                    </Transition.Group>
                                    <Divider />
                                </div>))}

                    </div>;
                }
                }
            </Query>
        )
    }
}



export default ProjectList;

