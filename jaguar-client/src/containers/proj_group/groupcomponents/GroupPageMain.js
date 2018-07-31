import React, {Component} from 'react';
import { Query } from "react-apollo";
import GroupDetail from '../groupcomponents/GroupDetails'
import decode from 'jwt-decode';
import { teamsByUser } from "../../apollo-graphql/userQueries";
import "./GroupPageMain.css";
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
        const {
            groupTeam,
            groupUsers,
            selectedTeamId,
            selectedGroup,
            groupDetails,
            queryVariables,
            userProjectGroups,
            variables,
            removeGroupSwitchForDefault,
            groupProject,
            groupProjectTeam
        } = this.props

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
                            groupProjectTeam={groupProjectTeam}
                            groupProject={groupProject}
                            groupUsers={groupUsers}
                            selectedTeamId={selectedTeamId}
                            selectedGroup={selectedGroup}
                            groupDetails={groupDetails}
                            queryVariables={queryVariables}
                            userProjectGroups={userProjectGroups}
                            variables={variables}
                            removeGroupSwitchForDefault={removeGroupSwitchForDefault}
                        />
                    </Details>
                    <Prioriety>
                        <GroupTaskPrioriety />
                    </Prioriety>
                </TeamPagePaneGrid>
            </div>
        )
    }
}

export default TeamPageMain;