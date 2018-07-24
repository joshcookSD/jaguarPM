import React, {Component} from 'react';
import GroupList from './groupcomponents/GroupList'
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

    selectGroup = (group) => {
        this.setState({selectedGroup: group, isSelected: true});
    };
    selectProject = (project) => {
        this.setState({projectOfGroup: project });
    };
    removeGroupSwitchForDefault = () => {
        this.setState({isSelected: false });
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
                                    selectProject={this.selectProject}
                                    isSelected={isSelected}
                                />
                            </MainSidebar>
                            <GroupPageMain
                                selectedGroup={selectedGroup}
                                groupDetails={groupDetails}
                                queryVariables={{_id: selectedGroup}}
                                userProjectGroups={userProjectGroups}
                                variables={{_id: user._id}}
                                removeGroupSwitchForDefault={this.removeGroupSwitchForDefault}

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

