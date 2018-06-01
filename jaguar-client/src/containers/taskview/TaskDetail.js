import React, {Component} from 'react';
import { Query, graphql, compose } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { task, updateTask, removeTask } from "../apollo-graphql/taskQueries";
import moment from 'moment';


class TaskDetail extends Component {
    state = {
        descriptionInput: false,
        description: '',
        planDateInput: false,
        plandate: '',
        dueDateInput: false,
        duedate: '',
        assignedInput: false,
        assigned: '',
    };

    render() {
        const {taskId, tasktitle, updateQuery, refreshVariables} = this.props;
        const queryVariables = {_id: taskId};
        const {descriptionInput, planDateInput, dueDateInput, assignedInput, description, assigned, plandate, duedate} = this.state;

        const updateVariables = {
            _id: taskId,
            tasktitle,
            taskdescription: description,
            assigned,
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
                                            onClick={() => this.setState({assignedInput: !assignedInput})}>
                                            Assigned to: {!data.task.taskcurrentowner ? 'unassigned' : data.task.taskcurrentowner.username}
                                        </Card.Description>
                                        {assignedInput &&
                                        <Form.Input
                                            fluid
                                            placeholder={!data.task.taskcurrentowner ? '' : data.task.taskcurrentowner.username}
                                            value={assigned}
                                            onChange={e => this.setState({assigned: e.target.value})}
                                        />}

                                        <Card.Description>
                                            Created: {moment.utc(data.task.createdAt).format('YYYY-MM-DD')}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button.Group fluid>
                                        <Button size='small' type='submit' positive>update</Button>
                                        <Button size='small' negative onClick={(e) => _removeTask(e)} >remove</Button>
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