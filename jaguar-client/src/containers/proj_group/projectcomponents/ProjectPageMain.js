import React, {Component} from 'react';
import ProjectDetails from './ProjectDetails/ProjectDetails'
import decode from 'jwt-decode';
import ProjectPagePanes from './ProjectPagePanes.js';
import ProjectPageTabs from './ProjectPageTabs.js';
import ProjectTaskPriorietyMain from './ProjectPriority/ProjectTaskPriorietyMain.js';
import NavBarStatic from '../projectcomponents/NavBarStatic'
import { Dimmer, Loader } from 'semantic-ui-react';
import {Activity, Details, Prioriety, Secondary, TeamPagePaneGrid} from '../../layout/Proj_GroupComponents.js'

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

class ProjectPageMain extends Component {

    componentWillUpdate(nextProps) {
        if(nextProps.selectedProject !== this.props.selectedProject) {
            this.setState({projectId: nextProps.selectedProject});
        }
    };
    changeView = (view) => {
        this.setState({activePageTab: view, isSelectedPageTab: true });
    };
    handleClick = (team) => {
        this.setState({activeView: team, isSelected: true });
    };

    state = {
        projectId: '',
        activePageTab: 'requirements',
        isSelectedPageTab: false,
        isSelected: false,
    };

    render() {

        const { activePageTab, isSelectedPageTab, projectId } = this.state;

        const {
            selectedProject,
            projectDetails,
            queryVariables,
            userTaskDetails,
            variables,
            removeProjectSwitchForDefault,
        } = this.props;

    if(this.state.projectId){
        return (
            <div className='container'>
                <NavBarStatic user={user}/>
                <TeamPagePaneGrid>
                    <Secondary>
                        <ProjectPageTabs
                            changeView={this.changeView}
                            activePageTab={activePageTab}
                            isSelectedPageTab={isSelectedPageTab}
                        />
                    </Secondary>
                    <Activity>
                        <ProjectPagePanes
                            activePageTab={activePageTab}
                            selectedProject={ projectId }
                        />
                    </Activity>
                    <Details>
                    <ProjectDetails
                        userId={userId}
                        selectedProject={projectId}
                        projectDetails={projectDetails}
                        queryVariables={queryVariables}
                        userTaskDetails={userTaskDetails}
                        variables={variables}
                        removeProjectSwitchForDefault={removeProjectSwitchForDefault}
                    />
                    </Details>
                    <Prioriety>
                        <ProjectTaskPriorietyMain
                            selectedProject={projectId}
                        />
                    </Prioriety>
                </TeamPagePaneGrid>
            </div>
        )
        }else { return (<div/>)}
    }
}
export default ProjectPageMain;
