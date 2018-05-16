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
import GroupDetails from './groupcomponents/GroupDetails'
import { TopSection } from '../layout/Section'
import {userTeams} from "../apollo-graphql/userQueries";

const token = localStorage.getItem('token');

class GroupView extends Component {
    state = {
        groupId: "",
    };

    selectGroup = (group) => {
        this.setState({groupId: group});
        console.log('has been clicked');
        console.log(group);
    };

    render() {
        const { user } = decode(token);
        const {groupId} = this.state;
        return(
            <Query query={userTeams} variables={{_id: user._id}}>
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
                                <GroupList selectGroup={this.selectGroup}/>
                            </MainSidebar>
                            <Header/>
                            <ContentArea>
                                <TopSection>
                                    <GroupDetails groupId={groupId}/>
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

