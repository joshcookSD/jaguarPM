import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
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

export const userTaskDetails = gql`
query user($_id: String ){
    user(_id: $_id){
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
        defaultgroup {
            _id
            grouptitle
            tasks {
                _id
                tasktitle
            }
        }
        defaultproject {
            _id
            projecttitle
            defaultgroup {
                _id
                grouptitle
            }
            groups {
                _id
                grouptitle
            }
        }
        defaultteam {
            _id
            teamtitle
            projects {
                _id
                projecttitle
            }
        }
        team {
            _id
            teamtitle
            defaultproject {
                _id
                projecttitle
            }
        }
    }
}`;


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
        const planDays = [tomorrow, plus2, plus3, plus4, plus5];
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
                                {planDays.map( day => (
                                    <Section key={day}><TaskDay
                                        tasks={data.user.tasks}
                                        day={day}
                                        defaultgroup={data.user.defaultgroup._id}
                                        defaultproject={data.user.defaultproject._id}
                                        defaultteam={data.user.defaultteam._id}
                                        updateQuery={userTaskDetails}
                                        variables={variables}
                                        currentTask={data.user.currenttask}
                                        taskselected={taskSelected}
                                        selectTask={this.selectTask}
                                    /></Section>
                                ))}
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
                                            teamId={team._id}
                                            teamtitle={team.teamtitle}
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
                                    team={data.user.team}
                                    variables={variables}
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

