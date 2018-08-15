import React, {Component} from 'react';
import GroupDetail from '../groupcomponents/GroupDetails'
import { Query } from "react-apollo";
import { Dimmer, Loader, Form, Button, Card } from 'semantic-ui-react';
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
import {groupDetails} from "../../apollo-graphql/groupProjectQueries";

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;


class TeamPageMain extends Component {

    componentWillUpdate(nextProps) {
        if(nextProps.selectedGroup !== this.props.selectedGroup) {
            this.setState({groupId: nextProps.selectedGroup});
        }
    }

    state = {
        groupId: '',
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
            selectedGroup,
            queryVariables,
            userProjectGroups,
            variables,
            removeGroupSwitchForDefault,
        } = this.props;

            if(this.state.groupId){
                return (
                <Query query={groupDetails} variables={{_id: selectedGroup}}>
                    {({loading, error, data}) => {
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
                                        <GroupPageTabs
                                            changeView={this.changeView}
                                            activePageTab={activePageTab}
                                            isSelectedPageTab={isSelectedPageTab}
                                        />
                                    </Secondary>
                                    <Activity>
                                        <GroupPagePanes
                                            data={data}
                                            activePageTab={activePageTab}
                                        />
                                    </Activity>
                                    <Details>
                                        <GroupDetail
                                            data={data}
                                            userId={userId}
                                            selectedGroup={selectedGroup}
                                            queryVariables={queryVariables}
                                            userProjectGroups={userProjectGroups}
                                            variables={variables}
                                            removeGroupSwitchForDefault={removeGroupSwitchForDefault}
                                        />
                                    </Details>
                                    <Prioriety>
                                        <GroupTaskPrioriety
                                            data={data}
                                            userId={userId}
                                            userName={user.username}
                                            selectedGroup={selectedGroup}
                                            queryVariables={queryVariables}
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

export default TeamPageMain;