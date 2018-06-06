import React, {Component} from 'react';
import { Query, graphql, compose } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { task, updateTask, removeTask } from "../apollo-graphql/taskQueries";
import moment from 'moment';
import TeamTaskDropDown from './taskscomponents/TeamTaskDropDown';
import ProjectTaskDropDown from './taskscomponents/ProjectTaskDropDown';
import GroupTaskDropDown from './taskscomponents/GroupTaskDropDown';
import AssignedTaskDropDown from './taskscomponents/AssignedTaskDropDown';


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

        const updateVariables = {
            _id: taskId,
            tasktitle,
            taskdescription: description,
            duedate,
            plandate
        };

        const _updateTask = async () => {
            await this.props.updateTask({
                variables: updateVariables,
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
                                <Card fluid raised>
                                    <Card.Content>
                                        <Card.Description onClick={() => this.setState({descriptionInput: !descriptionInput})}>
                                            Description: {!descriptionInput && data.task.taskdescription}
                                        </Card.Description>
                                        {descriptionInput &&
                                        <Form.Input
                                            fluid
                                            placeholder={data.task.taskdescription}
                                            value={description}
                                            onChange={e => this.setState({description: e.target.value})}
                                        />}

                                        <Card.Description
                                            onClick={() => this.setState({planDateInput: !planDateInput})}>
                                            Plan Date: {data.task.plandate ? moment.utc(data.task.plandate).format('YYYY-MM-DD') : ''}
                                        </Card.Description>
                                        {planDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={plandate ? moment.utc(data.task.plandate).format('YYYY-MM-DD') : 'No plan date set'}
                                            onChange={e => this.setState({plandate: e.target.value})}
                                        />}

                                        <Card.Description onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                            Due Date: {data.task.duedate ? moment.utc(data.task.duedate).format('YYYY-MM-DD') : ''}
                                        </Card.Description>
                                        {dueDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={duedate ? moment(data.task.duedate).format('YYYY-MM-DD') : Date.now()}
                                            onChange={e => this.setState({duedate: e.target.value})}
                                        />}

                                        <Card.Description
                                            onClick={() => this.setState({taskTeamInput: !taskTeamInput})}>
                                            Team: {!data.task.team ? 'unassigned' : data.task.team.teamtitle}
                                        </Card.Description>
                                        {taskTeamInput && <TeamTaskDropDown taskId={taskId} userId={userId} teamDetails={data.task.team}  query={task} variables={queryVariables} closeTeam={this.closeTeam}/>}

                                        <Card.Description
                                            onClick={() => this.setState({projectInput: !projectInput})}>
                                            Project: {!data.task.project ? 'unassigned' : data.task.project.projecttitle}
                                        </Card.Description>
                                        {projectInput && <ProjectTaskDropDown taskId={taskId} teamId={data.task.team._id} projectDetails={data.task.project}  query={task} variables={queryVariables} closeProject={this.closeProject}/>}

                                        <Card.Description
                                            onClick={() => this.setState({groupInput: !groupInput})}>
                                            Group: {!data.task.group ? 'unassigned' : data.task.group.grouptitle}
                                        </Card.Description>
                                        {groupInput && <GroupTaskDropDown taskId={taskId} projectId={data.task.project._id} groupDetails={data.task.group}  query={task} variables={queryVariables} closeGroup={this.closeGroup}/>}

                                        <Card.Description
                                            onClick={() => this.setState({assignedInput: !assignedInput})}>
                                            Assigned to: {!data.task.taskcurrentowner ? 'unassigned' : data.task.taskcurrentowner.username}
                                        </Card.Description>
                                        {assignedInput && <AssignedTaskDropDown taskId={taskId} teamId={data.task.team._id} userDetails={data.task.taskcurrentowner}  query={task} variables={queryVariables} closeAssigned={this.closeAssigned}/>}

                                        <Card.Description>
                                            Created: {moment.utc(data.task.createdAt).format('YYYY-MM-DD')}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button.Group fluid>
                                        <Button size='small' type='submit' basic>update</Button>
                                        <Button size='small' basic onClick={(e) => _removeTask(e)} >remove</Button>
                                        </Button.Group>
                                    </Card.Content>
                                </Card>
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