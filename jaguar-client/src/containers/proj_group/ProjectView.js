import React, {Component} from 'react';
import ProjectList from './projectcomponents/ProjectList'
import ProjectPageMain from './projectcomponents/ProjectPageMain'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import decode from "jwt-decode";
import {userTaskDetails} from "../apollo-graphql/userQueries";
import {projectDetails} from "../apollo-graphql/groupProjectQueries";
const token = localStorage.getItem('token');

class ProjectView extends Component {
    state = {
        selectedProject: '',
        isSelected: false,
    };

    defualtSelectProject =  (project) => {
        this.setState({
            selectedProject: project,
            isSelected: true,
        });
    };
    selectProject =  (project) => {
        this.setState({
            selectedProject: project,
            isSelected: true,
        });
    };

    //used to refetch after remove changes prop to force reload
    //also using for dropdown mutation
    removeProjectSwitchForDefault = () => {
        this.setState({isSelected: false });
    };

    render() {

        const { user } = decode(token);
        const variables = {_id: user._id};
        const { selectedProject, isSelected } = this.state;

        return (
            <div>
                <AppLayout>
                    <NavSidebar/>
                    <MainSidebar>
                        <ProjectList
                            selectProject={this.selectProject}
                            defualtSelectProject={this.defualtSelectProject}
                            isSelected={isSelected}
                        />
                    </MainSidebar>
                        <ProjectPageMain
                            selectedProject={selectedProject}
                            projectDetails={projectDetails}
                            queryVariables={{_id: selectedProject}}
                            userTaskDetails={userTaskDetails}
                            variables={variables}
                            removeProjectSwitchForDefault={this.removeProjectSwitchForDefault}
                        />
                </AppLayout>
            </div>
        )
    }
}

export default ProjectView;
