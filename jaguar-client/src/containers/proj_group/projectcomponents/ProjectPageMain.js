import React, {Component} from 'react';
import ProjectDetails from '../projectcomponents/ProjectDetails'
import { Query } from "react-apollo";
import decode from 'jwt-decode';
import ProjectPagePanes from './ProjectPagePanes.js';
import ProjectPageTabs from './ProjectPageTabs.js';
import ProjectTaskPrioriety from './ProjectTaskPrioriety.js';
import NavBarStatic from '../projectcomponents/NavBarStatic'
import { Dimmer, Loader, Form, Button, Card } from 'semantic-ui-react';
import {
    Activity,
    Details,
    Prioriety,
    Secondary,
    TeamPagePaneGrid
} from '../../layout/Proj_GroupComponents.js'
import {groupDetails} from "../../apollo-graphql/groupProjectQueries";

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;


class ProjectPageMain extends Component {
    componentWillUpdate(nextProps) {
        if(nextProps.selectedProject !== this.props.selectedProject) {
            this.setState({projectId: nextProps.selectedProject});
        }
    }

    changeView = (view) => {
        this.setState({activePageTab: view, isSelectedPageTab: true });
    };
    handleClick = (team) => {
        this.setState({activeView: team, isSelected: true });
    };

    state = {
        projectId: '',
        activeView: '',
        activePageTab: 'feed',
        isSelectedPageTab: false,
        isSelected: false,
    };

    render() {

        const { activePageTab, isSelectedPageTab } = this.state;

        const {
            selectedProject,
            projectDetails,
            queryVariables,
            userTaskDetails,
            variables,
            removeProjectSwitchForDefault,
        } = this.props;
        console.log(this.state.projectId)

            if(this.state.projectId){
                return (
                <Query query={projectDetails} variables={{_id: this.state.projectId}}>
                    {({loading, error, data}) => {
                        console.log(data)
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader/>
                                </Dimmer>
                            </div>
                        );
                        if (error) return <p>No Project Selected</p>;

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
                                            data={data}
                                            activePageTab={activePageTab}
                                        />
                                    </Activity>
                                    <Details>
                                        <ProjectDetails
                                            data={data}
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
                                            data={data}
                                            selectedProject={selectedProject}
                                            queryVariables={queryVariables}
                                            projectDetails={projectDetails}
                                            // isSelected={isSelected}
                                        />
                                    </Prioriety>
                                </TeamPagePaneGrid>
                            </div>
                        )
                    }}
                </Query>
                )
            }else { return (<div/>)}
    }
}
export default ProjectPageMain;
