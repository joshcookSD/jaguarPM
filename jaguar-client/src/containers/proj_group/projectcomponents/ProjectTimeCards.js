import React, {Component} from 'react';
import { Card, Progress, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const DropArrowWrapper = styled.div`
display:flex;
justify-content: start;
`;

const TaskListTimeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    background: #e0e1e2;
    border-radius: .28571429rem;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
`;

const UserTimePerTask = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    padding-left: 10%;
    padding-right: 10%;
`;

class ProjectTimeCards extends Component {

    state = {
        taskTimeDropedDown: false,
        taskTimeDropedDownIndex: ''
    };
    handleClick = (i) => {
        this.setState({taskTimeDropedDown:!this.state.taskTimeDropedDown});
        this.setState({taskTimeDropedDownIndex:i});
    };
    render () {
        let tasksList = (this.props.data.project.groups || []).map((group, i) => ((
            <div>
                <TaskListTimeWrapper onClick={() => this.handleClick(i)}>
                    <DropArrowWrapper>
                        {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) ? <Icon name='angle down' /> :<Icon name='angle right' /> }
                        <div>{group.grouptitle}</div>
                    </DropArrowWrapper>
                    <div>{(group.tasks || []).map(task => task.tasktime.map(tasktime => tasktime.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0)}</div>
                </TaskListTimeWrapper>
                {
                    (group.tasks || []).map(task =>
                        this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) &&
                        <UserTimePerTask>
                            <div>{task.tasktime.map(x => <div>{x.user.username}</div> )}</div>
                            <div>{task.tasktime.map(x => <div>{x.time}</div>)}</div>
                        </UserTimePerTask>
                    )
                }
            </div>
        )));
        // total task time
        let totalTaskTimeWorked = this.props.data.project.groups.map((group) => group.tasks.map((task) => task.tasktime.map(taskt => taskt.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0);
        //total group time
        let totalGroupTimeWorked = this.props.data.project.groups.map((group) => group.grouptime.map(gt => gt.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0);
        //total project time
        let totalProjectTimeWorked = this.props.data.project.projecttime.map(pt => pt.time).reduce((x, y) => x + y, 0);

        //total task time planned
        let totalTaskTimePlanned = this.props.data.project.groups.map((group) => group.tasks.map((task) => task.taskplannedtime.map(taskpt => taskpt.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0);
        //total group time planned
        let totalGroupTimePlanned = this.props.data.project.groups.map((group) => group.groupplannedtime.map(gpt => gpt.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0);
        //total project time planned
        let totalProjectTimeProject = this.props.data.project.projectplannedtime.map(ppt => ppt.time).reduce((x, y) => x + y, 0);

        let totalTimeForProject = totalTaskTimeWorked + totalGroupTimeWorked + totalProjectTimeWorked ;
        let totalTimePlannedForProject = totalTaskTimePlanned+ totalGroupTimePlanned+  totalProjectTimeProject;
        let projectHoursLeft = totalTimePlannedForProject - totalTimeForProject;

        let groupsCompleted = ((this.props.data.project.groups.filter(group => group.iscompleted === true).length));
        let groupTotal = this.props.data.project.groups.length;
        let allTasks = ((this.props.data.project.groups || []).map(group => group.tasks.length).reduce((x, y) => x + y, 0));
        let completedTasks = ((this.props.data.project.groups || []).map(group => group.tasks.filter(task => task.iscompleted === true).length).reduce((x, y) => x + y, 0))
        return (
            <div>
                <Card.Group itemsPerRow={3}>
                    <Card>
                        <Card.Content textAlign='center'>
                            <Card.Header>total project time worked</Card.Header>
                            <Card.Description>
                                <Header as='h2'>{totalTaskTimeWorked + totalGroupTimeWorked + totalProjectTimeWorked}</Header>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content textAlign='center'>
                            <Card.Header>total project time planned</Card.Header>
                            <Card.Description>
                                <Header as='h2'>{totalTaskTimePlanned + totalGroupTimePlanned + totalProjectTimeProject}</Header>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content textAlign='center'>
                            <Card.Header>total project hours left</Card.Header>
                            <Card.Description>
                                <Header as='h2'>{projectHoursLeft < 0 ? 0 : projectHoursLeft}</Header>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
                <Header as='h3'>Groups Completed</Header>
                <Progress value={groupsCompleted} total={groupTotal} progress='ratio' />
                <Header as='h3'>Time Used</Header>
                <Progress value={ totalTimeForProject } total={totalTimePlannedForProject} progress='ratio' />
                <Header as='h3'>All Tasks Completed</Header>
                <Progress value={completedTasks} total={allTasks} progress='ratio' />
                <div>{tasksList}</div>
            </div>
        )
    }
}

export default ProjectTimeCards;