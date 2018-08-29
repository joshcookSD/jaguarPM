import React, {Component} from 'react';
import { Query, graphql, compose } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { task, updateTask, removeTask } from "../apollo-graphql/taskQueries";
import moment from 'moment';
import styled from 'styled-components';
import TeamTaskDropDown from './taskscomponents/TeamTaskDropDown';
import ProjectTaskDropDown from './taskscomponents/ProjectTaskDropDown';
import GroupTaskDropDown from './taskscomponents/GroupTaskDropDown';
import AssignedTaskDropDown from './taskscomponents/AssignedTaskDropDown';

const TaskDetailLayout = styled.div`
    background-color: rgb(255,255,255);
    border-radius: .3em;
    display: flex;
    flex-direction: column;
    transition: box-shadow .1s ease;
    box-sizing: inherit;
    font-size: 1rem;
    line-height: 1.15em;
    position: relative;
    padding: .5em 1em;
`;

const TaskDetailLine = styled.div`
    box-sizing: border-box;
    color: rgba(0,0,0,.7);
    display: block;
    font-size: .9em;
    padding: .15em 0;
`;

class TaskDetail extends Component {
    state = {
        descriptionInput: false,
        description: '',
        planDateInput: false,
        plandate: '',
        dueDateInput: false,
        duedate: '',
        taskTeamInput: false,
        projectInput: false,
        groupInput: false,
        group: '',
        assignedInput: false,
    };

    closeTeam = () => {
        this.setState({taskTeamInput: false});
    };

    closeProject = () => {
        this.setState({projectInput: false});
    };

    closeGroup = () => {
        this.setState({groupInput: false});
    };

    closeAssigned = () => {
        this.setState({assignedInput: false})
    };

    render() {
        const {taskId, tasktitle, updateQuery, refreshVariables, userId} = this.props;
        const queryVariables = {_id: taskId};
        const {descriptionInput, planDateInput, dueDateInput, assignedInput, taskTeamInput, projectInput, groupInput, description, plandate, duedate} = this.state;


        const _updateTask = async () => {
            await this.props.updateTask({
                variables: {
                    _id: taskId,
                    tasktitle,
                    taskdescription: description,
                    duedate,
                    plandate,
                },
                refetchQueries: [{query: task, variables: queryVariables}]
            });
            this.setState({
                descriptionInput: false,
                planDateInput: false,
                dueDateInput: false,
                assignedInput: false,
                teamTaskInput: false,
                projectInput: false,
            })
        };

        const _removeTask = async (e) => {
            e.preventDefault();
            await this.props.removeTask({
                variables: queryVariables,
                refetchQueries: [{query: updateQuery, variables: refreshVariables}]
            });
        };

            return (
                <Query query={task} variables={queryVariables}>
                    {({loading, error, data}) => {
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader/>
                                </Dimmer>
                            </div>);
                        if (error) return <p>Error :(</p>;
                        return (
                            <Form onSubmit={() => _updateTask()}>
                                <TaskDetailLayout>
                                    <Card.Content>
                                        <TaskDetailLine onClick={() => this.setState({descriptionInput: !descriptionInput})}>
                                            Description: {!descriptionInput && data.task.taskdescription}
                                        </TaskDetailLine>
                                        {descriptionInput &&
                                        <Form.Input
                                            fluid
                                            placeholder={data.task.taskdescription}
                                            value={description}
                                            onChange={e => this.setState({description: e.target.value})}
                                        />}
                                        <TaskDetailLine
                                            onClick={() => this.setState({planDateInput: !planDateInput})}>
                                            Plan Date: {data.task.plandate ? moment.utc(data.task.plandate).format('YYYY-MM-DD') : ''}
                                        </TaskDetailLine>
                                        {planDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={plandate ? moment.utc(data.task.plandate).format('YYYY-MM-DD') : 'No plan date set'}
                                            onChange={e => this.setState({plandate: e.target.value})}
                                        />}
                                        <TaskDetailLine onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                            Due Date: {data.task.duedate ? moment.utc(data.task.duedate).format('YYYY-MM-DD') : ''}
                                        </TaskDetailLine>
                                        {dueDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={duedate ? moment(data.task.duedate).format('YYYY-MM-DD') : Date.now()}
                                            onChange={e => this.setState({duedate: e.target.value})}
                                        />}
                                        <TaskDetailLine
                                            onClick={() => this.setState({taskTeamInput: !taskTeamInput})}>
                                            Team: {!data.task.team ? 'unassigned' : data.task.team.teamtitle}
                                        </TaskDetailLine>
                                        {taskTeamInput && <TeamTaskDropDown taskId={taskId} userId={userId} teamDetails={data.task.team}  query={task} variables={queryVariables} closeTeam={this.closeTeam}/>}
                                        <TaskDetailLine
                                            onClick={() => this.setState({projectInput: !projectInput})}>
                                            Project: {!data.task.project ? 'unassigned' : data.task.project.projecttitle}
                                        </TaskDetailLine>
                                        {projectInput && <ProjectTaskDropDown taskId={taskId} teamId={data.task.team._id} projectDetails={data.task.project}  query={task} variables={queryVariables} closeProject={this.closeProject}/>}
                                        <TaskDetailLine
                                            onClick={() => this.setState({groupInput: !groupInput})}>
                                            Group: {!data.task.group ? 'unassigned' : data.task.group.grouptitle}
                                        </TaskDetailLine>
                                        {groupInput && <GroupTaskDropDown taskId={taskId} projectId={data.task.project._id} groupDetails={data.task.group}  query={task} variables={queryVariables} closeGroup={this.closeGroup}/>}
                                        <TaskDetailLine
                                            onClick={() => this.setState({assignedInput: !assignedInput})}>
                                            Assigned to: {!data.task.taskcurrentowner ? 'unassigned' : data.task.taskcurrentowner.username}
                                        </TaskDetailLine>
                                        {console.log(data)}
                                        {assignedInput && <AssignedTaskDropDown taskId={taskId} teamId={data.task.team._id} userDetails={data.task.taskcurrentowner}  query={task} variables={queryVariables} closeAssigned={this.closeAssigned}/>}
                                        <TaskDetailLine>
                                            Created: {moment.utc(data.task.createdAt).format('YYYY-MM-DD')}
                                        </TaskDetailLine>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button.Group fluid>
                                        <Button size='small' type='submit' color='green' basic>update</Button>
                                        <Button size='small' basic color='red' onClick={(e) => _removeTask(e)} >remove</Button>
                                        </Button.Group>
                                    </Card.Content>
                                </TaskDetailLayout>
                            </Form>
                        )
                    }
                    }
                </Query>
            )
        }
}

export default compose(
    graphql(updateTask, {
        name: 'updateTask',
    }),
    graphql(removeTask, {
        name: 'removeTask',
    })
)(TaskDetail);