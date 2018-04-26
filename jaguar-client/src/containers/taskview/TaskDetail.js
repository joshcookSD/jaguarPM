import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { task, updateTask } from "../apollo-graphql/taskQueries";
import moment from 'moment';


class TaskDetail extends Component {
    state = {
        descriptionInput: false,
        description: '',
        planDateInput: false,
        dueDateInput: false,
        assignedInput: false,
        assigned: '',
    };

    render() {
        const {taskId, tasktitle} = this.props;
        const queryVariables = {_id: taskId};
        const {descriptionInput, planDateInput, dueDateInput, assignedInput, description, assigned} = this.state;

        const _updateTask = async () => {
            await this.props.updateTask({
                variables: {_id: taskId, tasktitle, taskdescription: description, assigned},
                refetchQueries: [{query: task, variables: queryVariables}]
            })};

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
                                        <Card.Meta onClick={() => this.setState({descriptionInput: !descriptionInput})}>
                                            Description: {!descriptionInput && data.task.taskdescription}
                                        </Card.Meta>
                                        {descriptionInput &&
                                        <Form.Input
                                            fluid
                                            placeholder={data.task.taskdescription}
                                            value={description}
                                            onChange={e => this.setState({description: e.target.value})}
                                        />}
                                        <Card.Description
                                            onClick={() => this.setState({planDateInput: !planDateInput})}>
                                            Plan Date: {!planDateInput && data.task.plandate ? moment(data.task.plandate).format('YYYY-MM-DD') : 'task needs to be planned'}
                                        </Card.Description>
                                        {planDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={moment(data.task.plandate).format('YYYY-MM-DD')}
                                        />}
                                        <Card.Description onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                            Due Date: {!dueDateInput && data.task.duedate ? moment(data.task.duedate).format('YYYY-MM-DD') : 'No due date set'}
                                        </Card.Description>
                                        {dueDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={moment(data.task.duedate).format('YYYY-MM-DD')}
                                        />}
                                        <Card.Description
                                            onClick={() => this.setState({assignedInput: !assignedInput})}>
                                            Assigned: {!assignedInput && data.task.taskcurrentowner.username}
                                        </Card.Description>
                                        {assignedInput &&
                                        <Form.Input
                                            fluid
                                            placeholder={data.task.taskcurrentowner.username}
                                            value={assigned}
                                            onChange={e => this.setState({assigned: e.target.value})}
                                        />}
                                    </Card.Content>
                                    <Card.Content>
                                        <Button type='submit'>update</Button>
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

export default graphql(updateTask, {
    name: 'updateTask',
})(TaskDetail);