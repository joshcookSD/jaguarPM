import React, {Component} from 'react';
import TaskToday from '../../taskview/TaskToday'
import AppLayout from '../../layout/AppLayout'
import NavSidebar from '../../layout/NavSidebar'
import MainSidebar from '../../layout/MainSidebar'
import TeamAdminMain from './TeamAdminComponents/TeamAdminMain.js'
import decode from "jwt-decode";
import { Query } from "react-apollo";
import {Dimmer, Loader} from 'semantic-ui-react';
import {userTaskDetails} from "../../apollo-graphql/userQueries";
const token = localStorage.getItem('token');


class TeamAdminView extends Component {
    render() {
        const { user } = decode(token);
        const variables = {_id: user._id};
        return (
            <Query query={userTaskDetails} variables={variables}>
                {({loading, error, data}) => {
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
                                <TaskToday
                                    tasks={data.user.tasks}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                />
                            </MainSidebar>
                            <TeamAdminMain />
                        </AppLayout>
                    </div>
                }
                }
            </Query>
        )
    }
}

export default TeamAdminView;



