import React, {Component} from 'react';
import ProjectDetails from '../projectcomponents/ProjectDetails'
import decode from 'jwt-decode';
import ProjectPagePanes from './ProjectPagePanes.js';
import ProjectPageTabs from './ProjectPageTabs.js';
import ProjectTaskPrioriety from './ProjectTaskPrioriety.js';
import NavBarStatic from '../projectcomponents/NavBarStatic'
import {
    Activity,
    Details,
    Prioriety,
    Secondary,
    TeamPagePaneGrid
} from '../../layout/Proj_GroupComponents.js'

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

class ProjectPageMain extends Component {
    state = {
        activeView: '',
        activePageTab: 'feed',
        isSelectedPageTab: false,
        isSelected: false,
    };
    // change page tab view
    changeView = (view) => {
        this.setState({activePageTab: view, isSelectedPageTab: true });
    };

    //change team
    handleClick = (team) => {
        this.setState({activeView: team, isSelected: true });
    };

    render() {

        const { activePageTab, isSelectedPageTab, isSelected  } = this.state;
        const {
                selectedProject,
                projectDetails,
                queryVariables,
                userTaskDetails,
                variables,
                removeProjectSwitchForDefault,
        } = this.props;

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
                        <ProjectPagePanes activePageTab={activePageTab}/>
                    </Activity>

                    <Details>
                        <ProjectDetails
                            userId={userId}
                            selectedProject={selectedProject}
                            projectDetails={projectDetails}
                            queryVariables={queryVariables}
                            userTaskDetails={userTaskDetails}
                            variables={variables}
                            removeProjectSwitchForDefault={removeProjectSwitchForDefault}
                        />
                    </Details>
                    <Prioriety>
                        <ProjectTaskPrioriety
                            selectedProject={selectedProject}
                            queryVariables={queryVariables}
                            projectDetails={projectDetails}
                            isSelected={isSelected}
                        />
                    </Prioriety>
                </TeamPagePaneGrid>
            </div>
        )
    }
}

export default ProjectPageMain;
