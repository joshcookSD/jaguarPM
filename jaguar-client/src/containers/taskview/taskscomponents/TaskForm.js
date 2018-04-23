import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Input, Form } from 'semantic-ui-react';
import {createTask} from "../../apollo-graphql/taskQueries";


class TaskForm extends Component {
    state = {
        newTask: "",
    };

    render() {
        const {taskcurrentowner, plandate, updateQuery, variables} = this.props;

        const { newTask } = this.state;

        return (
            <Mutation mutation={createTask}>
                {(createTask, {data}) => {
                    return (
                        <div style={{marginBottom: '.5em'}}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createTask({
                                        variables: {tasktitle: newTask, taskcurrentowner, iscompleted: false, plandate},
                                        refetchQueries: [{ query: updateQuery, variables: variables}]
                                    });
                                    this.setState({newTask: ""});
                                }}
                            >
                                <Input
                                    value={newTask}
                                    type='text'
                                    action={{icon: 'add circle'}}
                                    placeholder='add task...'
                                    onChange={e => this.setState({newTask: e.target.value})}
                                />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
};

export default TaskForm;