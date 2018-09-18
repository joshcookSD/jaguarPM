import React, {Component} from 'react';
import gql from 'graphql-tag';
import TaskToday from '../taskview/TaskToday'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import TeamPageMain from './teampagecomponents/TeamPageMain'
import decode from "jwt-decode";
import { Query } from "react-apollo";
import {Dimmer, Loader} from 'semantic-ui-react';
const token = localStorage.getItem('token');

const tasksToday = gql`
query user($_id: String ){
    user(_id: $_id){
         defaultgroup{
          _id
          grouptitle
        }
        defaultteam{
          _id
          teamtitle
        }
        defaultproject{
          _id
          projecttitle
        }
        currenttask {
            _id
            tasktitle
            duedate
            iscompleted
            group {
                _id
                grouptitle
            }
            project {
                _id 
                projecttitle
            }
            team {
                _id
                teamtitle
            }
            plandate
            tasktime {
                _id
                time
            }
            taskplannedtime {
                _id
                time
            }
        }       
        tasks {
            _id
            tasktitle
            taskdescription
            iscompleted
            group {
                _id
                grouptitle
            }
            project {
                _id 
                projecttitle
            }
            team {
                _id
                teamtitle
            }
            plandate
            duedate
            tasktime {
                _id
                time
            }
            taskplannedtime {
                _id
                time
            }
        }
    }
}`;

class TeamPage extends Component {

    render() {

        const { user } = decode(token);
        const variables = {_id: user._id};
        return (
    <Query query={tasksToday} variables={variables}>
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
                            variables={variables}
                        />
                    </MainSidebar>
                    <TeamPageMain />
                </AppLayout>
            </div>
        }
        }
            </Query>
        )
    }
}

export default TeamPage;