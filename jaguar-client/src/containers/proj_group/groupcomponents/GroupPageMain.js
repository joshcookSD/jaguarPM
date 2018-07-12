import React, {Component} from 'react';
import { Query } from "react-apollo";
import GroupDetail from '../groupcomponents/GroupDetails'
import decode from 'jwt-decode';
import { teamsByUser } from "../../apollo-graphql/userQueries";
import "./GroupPageMain.css";
import styled from 'styled-components';
import GroupPagePanes from './GroupPagePanes.js';
import GroupPageTabs from './GroupPageTabs.js';
import NavBarStatic from '../projectcomponents/NavBarStatic'
import GroupTaskPrioriety from './GroupTaskPrioriety.js';
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
                                   <GroupPageTabs
                                       changeView={this.changeView}
                                       activePageTab={activePageTab}
                                       isSelectedPageTab={isSelectedPageTab}
                                   />
                                </Secondary>

                                <Activity>
                                    <GroupPagePanes activePageTab={activePageTab} />
                                </Activity>

                                <Details>
                                    <GroupDetail
                                        selectedGroup={this.props.selectedGroup}
                                        groupDetails={this.props.groupDetails}
                                        queryVariables={this.props.queryVariables}
                                    />
                                </Details>
                                <Prioriety>
                                    <GroupTaskPrioriety />
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