import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import { createTaskByGroup } from "../../apollo-graphql/groupProjectQueries";

class ProjectForm extends Component {
    state = {
        newTask: "",
        newTaskDescription: "",
    };

    render() {
        const { group, team, project, query, variables } = this.props;
        const { newTask, newTaskDescription } = this.state;
        return (
            <Mutation mutation={createTaskByGroup}>
                {(createTaskByGroup, { data }) => {
                    return (
                        <div style={{ marginBottom: '.5em' }}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createTaskByGroup({
                                        variables: {
                                            tasktitle: newTask,
                                            taskdescription: newTaskDescription,
                                            iscompleted: false,
                                            team: team,
                                            project: project,
                                            group: group

                                        },
                                        refetchQueries: [{
                                            query: query,
                                            variables: variables
                                        }]
                                    });
                                    // this.props.onClose();
                                    this.setState({
                                        newTask: "",
                                        newTaskDescription: ""
                                    });
                                }}
                            >
                                <Form.Field>
                                    <label>Name</label>
                                    <Form.Input
                                        placeholder='Task Name'
                                        value={newTask}
                                        type='text'
                                        onChange={e => this.setState({ newTask: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <Form.Input
                                        placeholder='Task Description'
                                        value={newTaskDescription}
                                        type='text'
                                        onChange={e => this.setState({ newTaskDescription: e.target.value })}
                                    />
                                </Form.Field>
                                <Button type='submit' color="grey" positive icon='checkmark' labelPosition='right' content='New Task!' />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default ProjectForm