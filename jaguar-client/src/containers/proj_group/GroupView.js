import React, {Component} from 'react';
import { Query } from "react-apollo";
import decode from 'jwt-decode';
import {Dimmer, Loader} from 'semantic-ui-react';
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import Header from '../layout/Header'
import ContentArea from '../layout/ContentArea'
import GroupList from './groupcomponents/GroupList'
import GroupDetail from './groupcomponents/GroupDetails'
import { TopSection } from '../layout/Section'
import {groupDetails, userProjectGroups} from "../apollo-graphql/groupProjectQueries";

const token = localStorage.getItem('token');

class GroupView extends Component {
    state = {
        selectedGroup: '',
        // teamOfProject: '',
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

        return(
            <Query query={userProjectGroups} variables={{_id: user._id}}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
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
                            <Header/>
                            <ContentArea>
                                <TopSection>
                                    <GroupDetail
                                        selectedGroup={selectedGroup}
                                        groupDetails={groupDetails}
                                        queryVariables={{_id: selectedGroup}}
                                    />
                                </TopSection>
                            </ContentArea>
                        </AppLayout>
                    </div>;
                }
                }
            </Query>
        )
    }
}



export default GroupView;

