import React, {Component} from 'react';
import GroupList from './groupcomponents/GroupList/GroupList'
import GroupPageMain from './groupcomponents/GroupPageMain'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import decode from "jwt-decode";
import {userProjectGroups} from "../apollo-graphql/groupProjectQueries";
const token = localStorage.getItem('token');

class GroupView extends Component {

    state = {
        selectedGroup: '',
        isSelected: false,
    };

    selectGroup = (group) => {
        this.setState({selectedGroup: group, isSelected: true});
    };
    removeGroupSwitchForDefault = () => {
        this.setState({isSelected: false });
    };
    render() {

        const { user } = decode(token);
        const { selectedGroup, isSelected } = this.state;
            return <div>
                <AppLayout>
                    <NavSidebar/>
                    <MainSidebar>
                        <GroupList
                            selectedGroup={selectedGroup}
                            isSelected={isSelected}
                            selectGroup={this.selectGroup}
                            selectProject={this.selectProject}
                            selectedTeamId={this.selectedTeamId}
                            handleGroupProject={this.handleGroupProject}
                        />
                    </MainSidebar>
                    <GroupPageMain
                        selectedGroup={selectedGroup}
                        queryVariables={{_id: selectedGroup}}
                        userProjectGroups={userProjectGroups}
                        variables={{_id: user._id}}
                        removeGroupSwitchForDefault={this.removeGroupSwitchForDefault}
                    />
                </AppLayout>
            </div>
    }
}
export default GroupView;

