import React, {Component} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {createProject} from "../../apollo-graphql/groupProjectQueries";


class ProjectForm extends Component {
    state = {
        newProject: "",
        newProjectDescription: "",
    };

    render() {
        const {teamId, userId, updateQuery, variables} = this.props;

        const { newProject, newProjectDescription } = this.state;

        return(
            <Mutation mutation={createProject}>
                {(createProject, {data}) => {
                    return (
                        <div style={{marginBottom: '.5em'}}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createProject({
                                        variables: {projecttitle: newProject, projectdescription: newProjectDescription, team: teamId, leader: userId, users: userId},
                                        refetchQueries: [{ query: updateQuery, variables: variables}]
                                    });
                                    this.setState({newTask: ""});
                                }}
                            >
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
                        </div>
                            )
                }}
            </Mutation>
        )
    }
}




export default ProjectForm