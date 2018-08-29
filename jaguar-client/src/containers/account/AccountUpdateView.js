import React, {Component} from 'react';
import { Query } from "react-apollo";
import TaskToday from '../taskview/TaskToday'
import decode from 'jwt-decode';
import {Dimmer, Loader} from 'semantic-ui-react';
import AppLayout from '../layout/AppLayout';
import NavSidebar from '../layout/NavSidebar';
import MainSidebar from '../layout/MainSidebar';
import AccountHeader from './AccountHeader';
import CreateOrgForm from './CreateOrgForm';
import ContentArea from '../layout/ContentArea';
import {userDetails, userTaskDetails} from "../apollo-graphql/userQueries";


const token = localStorage.getItem('token');

class AccountUpdateView extends Component {
    state = {
        activeView: 'info',
    };
    changeView = (view) => {
        this.setState({activeView: view});
    };

    render() {
        const { activeView} = this.state;
        const { user } = decode(token);
        const variables = {_id: user._id};

        return(
            <Query query={userDetails} variables={variables}>
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
                                <TaskToday
                                    tasks={data.user.tasks}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                />
                            </MainSidebar>

                            <AccountHeader changeView={this.changeView} activeView={activeView} />

                            {activeView === 'info' &&
                                <ContentArea>
                                    <span>Update info goes here</span>
                                </ContentArea>
                            }

                            {activeView === 'account' &&
                                <ContentArea>
                                    <span>Update account goes here</span>
                                </ContentArea>
                            }

                            {activeView === 'orgs' &&
                                <ContentArea>
                                    <CreateOrgForm/>
                                </ContentArea>
                            }

                        </AppLayout>
                    </div>;
                }}
            </Query>
        )
    }
}



export default AccountUpdateView;

