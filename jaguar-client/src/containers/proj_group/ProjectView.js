import React, {Component} from 'react';
import ProjectList from './projectcomponents/ProjectList'
import ProjectPageMain from './projectcomponents/ProjectPageMain'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import decode from "jwt-decode";
import { Query } from "react-apollo";
import {Dimmer, Loader} from 'semantic-ui-react';
import {userTaskDetails} from "../apollo-graphql/userQueries";
import {projectDetails} from "../apollo-graphql/groupProjectQueries";
const token = localStorage.getItem('token');

class ProjectView extends Component {

    state = {
        teamOfProject: '',
        selectedProject: '',
        isSelected: false,
    };

    selectProject =  (project, team) => {
        this.setState({selectedProject: project, isSelected: true, teamOfProject: team });
    };

    selectTeam = (team) => {
        this.setState({teamOfProject: team });
    };

    render() {
        const { user } = decode(token);
        const variables = {_id: user._id};
        const { selectedProject, isSelected } = this.state;
        return (
            <Query query={userTaskDetails} variables={variables}>
                {({loading, error}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                        <AppLayout>
                            <NavSidebar/>
                            <MainSidebar>
                                <ProjectList
                                    selectTeam={this.selectTeam}
                                    selectProject={this.selectProject}
                                    isSelected={isSelected}
                                />
                            </MainSidebar>

                                <ProjectPageMain
                                    selectedProject={selectedProject}
                                    projectDetails={projectDetails}
                                    queryVariables={{_id: selectedProject}}
                                />
                        </AppLayout>
                    </div>
                }
                }
            </Query>
        )
    }
}

export default ProjectView;
