import React, {Component} from 'react';
import { Query } from "react-apollo";
import decode from 'jwt-decode';
import { teamsByUser } from "../../apollo-graphql/userQueries";
import  TeamPageNavTabs from './TeamPageNavTabs'
import TeamPageDetails from './TeamPageDetails';
import TeamPageTabs from './TeamPageTabs.js';
import TeamPagePanes from './TeamPagePanes.js';
import TeamTaskPrioriety from './TeamTaskPrioriety.js';
import { Dimmer, Loader } from 'semantic-ui-react'
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
        const { activeView, activePageTab, isSelected,isSelectedPageTab } = this.state;

        return (
        <Query query={teamsByUser} variables={variables}>
            {({ loading, error, data }) => {
                console.log(data)
                if(this.state.isSelected === false ) {
                    (data.teamsByUser || []).forEach((team, i) => {
                        if (i === 0) {
                            this.setState({activeView: team, isSelected: true})
                        }
                    });
                }
                return (
                    <div className='container'>
                        <TeamPageNavTabs
                            changeView={this.handleClick}
                            activeView={activeView}
                            activePageTab={activePageTab}
                            isSelected={isSelected}
                            data={data}
                            user={user}
                        />
                        <TeamPagePaneGrid>
                            <Secondary>
                                <TeamPageTabs changeView={this.changeView} activePageTab={activePageTab} isSelectedPageTab={isSelectedPageTab}/>
                            </Secondary>

                            <Activity>
                                <TeamPagePanes activePageTab={activePageTab} team={activeView}/>
                            </Activity>

                            {isSelected ?
                                ([
                                    <Details>
                                        <TeamPageDetails activeView={activeView} isSelectedPageTab={isSelectedPageTab}/>
                                    </Details>,

                                    <Prioriety>
                                        <TeamTaskPrioriety activeView={activeView}/>
                                    </Prioriety>
                                ]) : (
                                    <Dimmer active>
                                        <Loader />
                                    </Dimmer>
                                )
                            }
                        </TeamPagePaneGrid>
                    </div>
                )
            }}
        </Query>
        )
    }
}

export default TeamPageMain;

