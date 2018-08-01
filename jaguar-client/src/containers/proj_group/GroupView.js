import React, {Component} from 'react';
import GroupList from './groupcomponents/GroupList'
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
        selectedTeamId:'',
        groupProject: '',
    };

    selectGroup = (group) => {
        this.setState({selectedGroup: group, isSelected: true});
    };
    selectProject = (project) => {
        this.setState({projectOfGroup: project });
    };
    removeGroupSwitchForDefault = () => {
        this.setState({isSelected: false });
    };
    selectedTeamId = (team) => {
        this.setState({selectedTeamId: team });
    };
    handleGroupProject = (groupProject) => {
        this.setState({groupProject: groupProject})
    };

    render() {
        const { user } = decode(token);
        const {
            selectedGroup,
            isSelected,
            selectedTeamId,
            groupProject,
        } = this.state;
            return <div>
                <AppLayout>
                    <NavSidebar/>
                    <MainSidebar>
                        <GroupList
                            isSelected={isSelected}
                            selectGroup={this.selectGroup}
                            selectProject={this.selectProject}
                            selectedTeamId={this.selectedTeamId}
                            handleGroupProject={this.handleGroupProject}
                        />
                    </MainSidebar>
                    <GroupPageMain
                        selectedTeamId={selectedTeamId}
                        selectedGroup={selectedGroup}
                        queryVariables={{_id: selectedGroup}}
                        userProjectGroups={userProjectGroups}
                        variables={{_id: user._id}}
                        groupProject={groupProject}
                        removeGroupSwitchForDefault={this.removeGroupSwitchForDefault}
                    />
                </AppLayout>
            </div>
    }
}

export default GroupView;

