import React, {Component} from 'react';
import { Query } from "react-apollo";
import TaskToday from '../taskview/TaskToday'
import TaskDay from '../taskview/TaskDay'
import TaskUnplanned from '../taskview/TaskUnplanned'
import TaskTeam from '../taskview/TaskTeam'
import moment from 'moment';
import decode from 'jwt-decode';
import {Dimmer, Loader} from 'semantic-ui-react';
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import TaskHeader from '../layout/TaskHeader'
import ContentArea from '../layout/ContentArea'
import {Section} from '../layout/Section'
import {userTaskDetails} from "../apollo-graphql/userQueries";


const token = localStorage.getItem('token');

class TaskView extends Component {
    state = {
        activeView: 'plan',
        isSelected: false,
        taskSelected: '',
    };
    changeView = (view) => {
        this.setState({activeView: view, isSelected: true });
    };
    selectTask = (task) => {
        this.setState({taskSelected: task})
    };

    render() {
        const { activeView, isSelected } = this.state;
        const { user } = decode(token);
        const tomorrow = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        const plus2 = moment(Date.now()).add(2,'day').format('YYYY-MM-DD');
        const plus3 = moment(Date.now()).add(3,'day').format('YYYY-MM-DD');
        const plus4 = moment(Date.now()).add(4,'day').format('YYYY-MM-DD');
        const plus5 = moment(Date.now()).add(5,'day').format('YYYY-MM-DD');
        return(
            <Query query={userTaskDetails} variables={{_id: user._id}}>
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
                            <MainSidebar><TaskToday defaultgroup={data.user.defaultgroup._id} defaultproject={data.user.defaultproject._id} defaultteam={data.user.defaultteam._id} /></MainSidebar>
                            <TaskHeader changeView={this.changeView} activeView={activeView} isSelected={isSelected}/>
                            {activeView === 'plan' &&
                            <ContentArea>
                                <Section><TaskDay day={tomorrow} defaultgroup={data.user.defaultgroup._id} defaultproject={data.user.defaultproject._id} defaultteam={data.user.defaultteam._id}/></Section>
                                <Section><TaskDay day={plus2} defaultgroup={data.user.defaultgroup._id} defaultproject={data.user.defaultproject._id} defaultteam={data.user.defaultteam._id}/></Section>
                                <Section><TaskDay day={plus3} defaultgroup={data.user.defaultgroup._id} defaultproject={data.user.defaultproject._id} defaultteam={data.user.defaultteam._id}/></Section>
                                <Section><TaskDay day={plus4} defaultgroup={data.user.defaultgroup._id} defaultproject={data.user.defaultproject._id} defaultteam={data.user.defaultteam._id}/></Section>
                                <Section><TaskDay day={plus5} defaultgroup={data.user.defaultgroup._id} defaultproject={data.user.defaultproject._id} defaultteam={data.user.defaultteam._id}/></Section>
                                <Section><TaskUnplanned defaultgroup={data.user.defaultgroup._id} defaultproject={data.user.defaultproject._id} defaultteam={data.user.defaultteam._id}/></Section>
                                {(data.user.team || []).map((team) => (
                                    <Section key={team._id}>
                                        <TaskTeam teamId={team._id} teamtitle={team.teamtitle} defaultgroup={team.defaultproject.defaultgroup._id} defaultproject={team.defaultproject._id}/>
                                    </Section>
                                ))
                                }
                            </ContentArea> }

                        </AppLayout>
                    </div>;
                }
                }
            </Query>
        )
    }
}



export default TaskView;

