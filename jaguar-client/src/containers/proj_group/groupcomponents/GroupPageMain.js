import React, {Component} from 'react';
import GroupDetail from '../groupcomponents/GroupDetails'

import decode from 'jwt-decode';
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
            selectedTeamId,
            selectedGroup,
            queryVariables,
            userProjectGroups,
            variables,
            removeGroupSwitchForDefault,
            groupProject,
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
                            userId={userId}
                            groupProject={groupProject}
                            selectedTeamId={selectedTeamId}
                            selectedGroup={selectedGroup}
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