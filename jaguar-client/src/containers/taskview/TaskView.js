import React, {Component} from 'react';
import { Query } from "react-apollo";
import TaskToday from '../taskview/TaskToday'
import TaskDay from '../taskview/TaskDay'
import TaskUnplanned from '../taskview/TaskUnplanned'
import TaskTeam from '../taskview/TaskTeam'
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
import TaskGrid from './TaskGrid';
import TaskTimeView from './TaskTimeView';
import {userTaskDetails} from "../apollo-graphql/userQueries";
import {projectDetails} from "../apollo-graphql/groupProjectQueries";


const token = localStorage.getItem('token');

class TaskView extends Component {
    state = {
        activeView: 'plan',
        isSelected: false,
        taskSelected: '',
        weekSelected: {key: '2018-08-12', text: 'Week of August 12, 2018', value: '2018-08-12'},
    };
    changeView = (view) => {
        this.setState({activeView: view, isSelected: true });
    };
    selectTask = (task) => {
        this.setState({taskSelected: task});
    };
    selectWeek = (week) => {
        this.setState({weekSelected: week});
    };


    render() {
        const { activeView, isSelected, taskSelected, weekSelected } = this.state;
        const { user } = decode(token);
        const tomorrow = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        const plus2 = moment(Date.now()).add(2,'day').format('YYYY-MM-DD');
        const plus3 = moment(Date.now()).add(3,'day').format('YYYY-MM-DD');
        const plus4 = moment(Date.now()).add(4,'day').format('YYYY-MM-DD');
        const plus5 = moment(Date.now()).add(5,'day').format('YYYY-MM-DD');
        const variables = {_id: user._id};
        const weekOptions = [
            {key: '2018-07-29', text: 'Week of July 29, 2018', value: '2018-07-29'},
            {key: '2018-08-05', text: 'Week of August 5, 2018', value: '2018-08-05'},
            {key: '2018-08-12', text: 'Week of August 12, 2018', value: '2018-08-12'},
            {key: '2018-08-19', text: 'Week of August 19, 2018', value: '2018-08-19'},
            {key: '2018-08-26', text: 'Week of August 26, 2018', value: '2018-08-26'},
            {key: '2018-09-02', text: 'Week of September 2, 2018', value: '2018-09-02'}
        ];
        const currentWeek = {key: '2018-08-12', text: 'Week of August 12, 2018', value: '2018-08-12'};
        console.log(weekSelected);

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
                                        {console.log(team)}
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
                                    <TaskGrid
                                        user={user._id}
                                        tasks={data.user.tasks}
                                        updateQuery={userTaskDetails}
                                        variables={variables}
                                    />
                                    </GridArea>
                            }
                            {activeView === 'time' &&
                            <GridArea>
                                <div>
                                    <Dropdown text={weekSelected.text} fluid scrolling floating labeled button className='icon' >
                                        <Dropdown.Menu>
                                            <Dropdown.Header content='New Group' />
                                            {weekOptions.map((option, i) =>
                                                <Dropdown.Item
                                                    key={i}
                                                    value={option.value}
                                                    {...option}
                                                    onClick={() => this.selectWeek(option)}
                                                />)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <TaskTimeView user={user} selectedWeek={weekSelected.value}/>
                            </GridArea>
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

