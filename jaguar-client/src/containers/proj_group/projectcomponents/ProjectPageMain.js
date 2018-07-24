import React, {Component} from 'react';
import { Query } from "react-apollo";
import ProjectDetails from '../projectcomponents/ProjectDetails'
import decode from 'jwt-decode';
import {teamsByUser} from "../../apollo-graphql/userQueries";
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
const variables = { user: userId };

class TeamPageMain extends Component {
    state = {
        activeView: '',
        activePageTab: 'feed',
        isSelectedPageTab: false,
        isSelected: false,
    };
    changeView = (view) => {
        this.setState({activePageTab: view, isSelectedPageTab: true });
    };

    handleClick = (team) => {
        this.setState({activeView: team, isSelected: true });
    };

    render() {
        const { activePageTab, isSelectedPageTab } = this.state;

        return (
            <Query query={teamsByUser} variables={variables}>
                {({ loading, error, data }) => {
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
                                        selectedProject={this.props.selectedProject}
                                        projectDetails={this.props.projectDetails}
                                        queryVariables={this.props.queryVariables}
                                        userTaskDetails={this.props.userTaskDetails}
                                        variables={this.props.variables}
                                        removeProjectSwitchForDefault={this.props.removeProjectSwitchForDefault}
                                    />
                                </Details>
                                <Prioriety>
                                    <ProjectTaskPrioriety />
                                </Prioriety>
                            </TeamPagePaneGrid>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default TeamPageMain;
