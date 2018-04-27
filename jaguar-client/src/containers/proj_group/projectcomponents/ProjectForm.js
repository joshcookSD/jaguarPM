import React, {Component} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {createTask} from "../../apollo-graphql/taskQueries";


class ProjectForm extends Component {
    state = {
        newProject: "",
        newProjectDescription: "",
    };

    render() {

        return(
            <Mutation mutation={createTask}>
                {(createTask, {data}) => {
                    return (
                        <div style={{marginBottom: '.5em'}}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createTask({
                                        variables: {tasktitle: newTask, taskcurrentowner, iscompleted: false, plandate, team},
                                        refetchQueries: [{ query: updateQuery, variables: variables}]
                                    });
                                    this.setState({newTask: ""});
                                }}
                            >
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Project Name' />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Project Description' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}




export default ProjectForm