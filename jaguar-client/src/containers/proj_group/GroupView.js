import React, {Component} from 'react';
import GroupList from './groupcomponents/GroupList'
import GroupPageMain from './groupcomponents/GroupPageMain'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import decode from "jwt-decode";
import {groupDetails, userProjectGroups} from "../apollo-graphql/groupProjectQueries";
const token = localStorage.getItem('token');

class GroupView extends Component {

    state = {
        selectedGroup: '',
        isSelected: false,
        selectedTeamId:'',
        groupUsers: '',
        groupProject: '',
        GroupProjectTeam: '',
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
    groupUsersForDD = (users) => {
        this.setState({groupUsers:users })
    };
    handleGroupUsers = (users) => {
        this.setState({groupUsers:users })
    };
    handleGroupProject = (groupProject) => {
        this.setState({groupProject: groupProject})
    };
    handleGroupProjectTeam = (projectTeam) => {
        console.log(projectTeam)
        this.setState({GroupProjectTeam: projectTeam})
    };

    render() {

        const { user } = decode(token);

        const {
            selectedGroup,
            isSelected,
            selectedTeamId,
            groupUsers,
            groupProject,
            groupProjectTeam
        } = this.state;

            return <div>
                <AppLayout>
                    <NavSidebar/>
                    <MainSidebar>
                        <GroupList
                            handleGroupUsers={this.handleGroupUsers}
                            selectTeam={this.selectTeam}
                            selectGroup={this.selectGroup}
                            selectProject={this.selectProject}
                            isSelected={isSelected}
                            selectedTeamId={this.selectedTeamId}
                            groupUsers={this.groupUsersForDD}
                            handleGroupProject={this.handleGroupProject}
                            groupTeamforDdDefault={this.groupTeamforDdDefault}
                            handleGroupProjectTeam={this.handleGroupProjectTeam}
                        />
                    </MainSidebar>
                    <GroupPageMain
                        groupProjectTeam={groupProjectTeam}
                        groupUsersForDd={groupUsers}
                        selectedTeamId={selectedTeamId}
                        selectedGroup={selectedGroup}
                        groupDetails={groupDetails}
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

