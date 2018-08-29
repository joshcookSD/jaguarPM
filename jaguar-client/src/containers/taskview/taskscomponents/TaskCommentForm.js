import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Input, Form } from 'semantic-ui-react';
import { createTaskComments } from "../../apollo-graphql/commentQueries";


class TaskCommentForm extends Component {
    state = {
        newTaskComment: "",
    };

    render() {
        const {taskId, userId, updateQuery, variables} = this.props;

        const { newTaskComment } = this.state;

        return (
            <Mutation mutation={createTaskComments}>
                {(createTask, {data}) => {
                    return (
                        <Form
                            onSubmit={async e => {
                                e.preventDefault();
                                await createTask({
                                    variables: {comment: newTaskComment, user: userId, task: taskId},
                                    refetchQueries: [{ query: updateQuery, variables: variables}]
                                });
                                this.setState({newTaskComment: ""});
                            }}
                        >
                            <Input
                                fluid
                                size='mini'
                                value={newTaskComment}
                                type='text'
                                action={{icon: 'add circle'}}
                                placeholder='add comment...'
                                onChange={e => this.setState({newTaskComment: e.target.value})}
                            />
                        </Form>
                    )
                }}
            </Mutation>
        );
    }
}

export default TaskCommentForm;