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
                        <div style={{marginBottom: '.5em'}}>
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
                                    value={newTaskComment}
                                    type='text'
                                    action={{icon: 'add circle'}}
                                    placeholder='add Comment...'
                                    onChange={e => this.setState({newTaskComment: e.target.value})}
                                />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default TaskCommentForm;