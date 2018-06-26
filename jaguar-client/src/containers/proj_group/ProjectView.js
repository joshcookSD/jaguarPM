import React, {Component} from 'react';
import { Query } from "react-apollo";
import decode from 'jwt-decode';
import {Dimmer, Loader} from 'semantic-ui-react';
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import Header from '../layout/Header'
import { ProjGroupContentArea } from '../layout/Proj_GroupComponents.js'
import ProjectList from './projectcomponents/ProjectList'
import ProjectDetails from './projectcomponents/ProjectDetails'
import { TopSection, BottomSection } from '../layout/Section'
import {userTeams} from "../apollo-graphql/userQueries";
import { projectDetails } from "../apollo-graphql/groupProjectQueries";
import  UnassignedGroupList  from './projectcomponents/UnassignedGroupList';


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
        const {teamOfProject, selectedProject, isSelected} = this.state;
        return(
            <Query query={userTeams} variables={{_id: user._id}}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
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
                            <Header/>
                            <ProjGroupContentArea>
                                <ProjectDetails
                                    selectedProject={selectedProject}
                                    projectDetails={projectDetails}
                                    queryVariables={{_id: selectedProject}}
                                />
                                <UnassignedGroupList
                                    selectedProject={selectedProject}
                                    projectDetails={projectDetails}
                                    queryVariables={{_id: selectedProject}}
                                    userId={ user._id }
                                    selectTeam={teamOfProject}
                                />
                            </ProjGroupContentArea>
                        </AppLayout>
                    </div>;
                }
                }
            </Query>
        )
    }
}

export default ProjectView;

