import React, {Component} from 'react';
import { Query } from "react-apollo";
import TaskToday from '../taskview/TaskToday'
import TaskDay from './taskviewcomponents/TaskDay'
import TaskUnplanned from './taskviewcomponents/TaskUnplanned'
import TaskTeam from './taskviewcomponents/TaskTeam'
import moment from 'moment';
import decode from 'jwt-decode';
import {Dimmer, Loader, Dropdown} from 'semantic-ui-react';
import AppLayout from '../layout/AppLayout';
import NavSidebar from '../layout/NavSidebar';
import MainSidebar from '../layout/MainSidebar';
import TaskHeader from '../layout/TaskHeader';
import ContentArea from '../layout/ContentArea';
import GridArea from '../layout/GridArea';
import {Section} from '../layout/Section';
import TaskGridView from './TaskGridView';
import TaskTimeView from './TaskTimeView';
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
        this.setState({taskSelected: task});
    };



    render() {
        const { activeView, isSelected, taskSelected} = this.state;
        const { user } = decode(token);
        const tomorrow = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        const plus2 = moment(Date.now()).add(2,'day').format('YYYY-MM-DD');
        const plus3 = moment(Date.now()).add(3,'day').format('YYYY-MM-DD');
        const plus4 = moment(Date.now()).add(4,'day').format('YYYY-MM-DD');
        const plus5 = moment(Date.now()).add(5,'day').format('YYYY-MM-DD');
        const variables = {_id: user._id};

        return(
            <Query query={userTaskDetails} variables={variables}>
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
                                    currentTask={data.user.currenttask}
                                    taskSelected={taskSelected}
                                    selectTask={this.selectTask}
                                />
                            </MainSidebar>

                            <TaskHeader
                                changeView={this.changeView}
                                activeView={activeView}
                                isSelected={isSelected}
                                user={user}
                            />
                            {activeView === 'plan' &&

                                <ContentArea>
                                <Section><TaskDay
                                    tasks={data.user.tasks}
                                    day={tomorrow}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                    currentTask={data.user.currenttask}
                                    taskselected={taskSelected}
                                    selectTask={this.selectTask}
                                /></Section>
                                <Section><TaskDay
                                    tasks={data.user.tasks}
                                    day={plus2}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                    currentTask={data.user.currenttask}
                                    taskselected={taskSelected}
                                    selectTask={this.selectTask}
                                /></Section>
                                <Section><TaskDay
                                    tasks={data.user.tasks}
                                    day={plus3}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                    currentTask={data.user.currenttask}
                                    taskselected={taskSelected}
                                    selectTask={this.selectTask}
                                /></Section>
                                <Section><TaskDay
                                    tasks={data.user.tasks}
                                    day={plus4}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                    currentTask={data.user.currenttask}
                                    taskselected={taskSelected}
                                    selectTask={this.selectTask}
                                /></Section>
                                <Section><TaskDay
                                    tasks={data.user.tasks}
                                    day={plus5}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                    currentTask={data.user.currenttask}
                                    taskselected={taskSelected}
                                    selectTask={this.selectTask}
                                /></Section>
                                <Section><TaskUnplanned
                                    tasks={data.user.tasks}
                                    lastDay={plus5}
                                    defaultgroup={data.user.defaultgroup._id}
                                    defaultproject={data.user.defaultproject._id}
                                    defaultteam={data.user.defaultteam._id}
                                    updateQuery={userTaskDetails}
                                    variables={variables}
                                    currentTask={data.user.currenttask}
                                    taskselected={taskSelected}
                                    selectTask={this.selectTask}
                                /></Section>
                                {data.user.team.map((team) => (

                                    <Section key={team._id}>
                                        <TaskTeam
                                            tasks={team.tasks}
                                            teamId={team._id}
                                            teamtitle={team.teamtitle}
                                            defaultgroup={team.defaultproject.defaultgroup._id}
                                            defaultproject={team.defaultproject._id}
                                            updateQuery={userTaskDetails}
                                            variables={variables}
                                            currentTask={data.user.currenttask}
                                            taskselected={taskSelected}
                                            selectTask={this.selectTask}
                                        />
                                    </Section>
                                ))
                                }
                            </ContentArea> }
                            {activeView === 'grid' &&
                                <GridArea>
                                    <div>
                                        <Dropdown placeholder='team' fluid selection options={(data.user.team || []).map(team => ({ key: team._id, text: team.teamtitle, value: team._id}))}/>
                                    </div>
                                    <TaskGridView
                                        user={user._id}
                                        tasks={data.user.tasks}
                                        updateQuery={userTaskDetails}
                                        variables={variables}
                                    />
                                    </GridArea>
                            }
                            {activeView === 'time' &&
                                <TaskTimeView
                                    user={user}
                                    defaultgroup={data.user.defaultgroup}
                                    defaultproject={data.user.defaultproject}
                                    defaultteam={data.user.defaultteam}
                                    time={data.user.time}
                                    team={data.user.team}
                                />
                            }
                        </AppLayout>
                    </div>;
                }
                }
            </Query>
        )
    }
}



export default TaskView;

