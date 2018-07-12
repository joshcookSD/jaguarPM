import React, {Component} from 'react';
import GroupList from './groupcomponents/GroupList'
import NavBarStatic from './projectcomponents/NavBarStatic'
import GroupPageMain from './groupcomponents/GroupPageMain'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import decode from "jwt-decode";
import { Query } from "react-apollo";
import {Dimmer, Loader} from 'semantic-ui-react';
import {groupDetails, userProjectGroups} from "../apollo-graphql/groupProjectQueries";
const token = localStorage.getItem('token');

class GroupView extends Component {

    state = {
        selectedGroup: '',
        isSelected: false,
    };

    // selectProject = (project, team) => {
    selectGroup = (group) => {
        // this.setState({selectedProject: project, isSelected: true, teamOfProject: team });
        this.setState({selectedGroup: group, isSelected: true});
    };

    selectProject = (project) => {
        this.setState({projectOfGroup: project });
    };

    render() {
        const { user } = decode(token);
        const {selectedGroup, isSelected} = this.state;
        return (
            <Query query={userProjectGroups} variables={{_id: user._id}}>
                {({loading, error}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                        <AppLayout>
                            <NavSidebar/>
                            <MainSidebar>
                                <GroupList
                                    selectTeam={this.selectTeam}
                                    selectGroup={this.selectGroup}
                                    isSelected={isSelected}
                                />
                            </MainSidebar>
                            <GroupPageMain
                                selectedGroup={selectedGroup}
                                groupDetails={groupDetails}
                                queryVariables={{_id: selectedGroup}}
                            />

                        </AppLayout>
                    </div>
                }
                }
            </Query>
        )
    }
}

export default GroupView;

