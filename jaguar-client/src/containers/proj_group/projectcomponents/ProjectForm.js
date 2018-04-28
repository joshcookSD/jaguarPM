import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import {createProject} from "../../apollo-graphql/groupProjectQueries";


class ProjectForm extends Component {
    state = {
        newProject: "",
        newProjectDescription: "",
    };

    render() {
        const { team, teamsByOwner, variables} = this.props;

        const { newProject, newProjectDescription } = this.state;
        console.log(variables.owner);
        console.log(team);

        return(
            <Mutation mutation={createProject}>
                {(createProject, {data}) => {
                    return (
                        <div style={{marginBottom: '.5em'}}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createProject({
                                        variables: { projecttitle: newProject, projectdescription: newProjectDescription, team, leader: variables.owner, users: variables.owner},
                                        refetchQueries: [{ query: teamsByOwner, variables: variables}]
                                    });
                                    // this.props.onClose();
                                    this.setState({newProject: "", newProjectDescription: ""});
                                }}
                            >
                                <Form.Field>
                                    <label>Name</label>
                                    <Form.Input
                                        placeholder='Project Name'
                                        value={newProject}
                                        type='text'
                                        onChange={e => this.setState({newProject: e.target.value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <Form.Input
                                        placeholder='Project Description'
                                        value={newProjectDescription}
                                        type='text'
                                        onChange={e => this.setState({newProjectDescription: e.target.value})}
                                    />
                                </Form.Field>
                                <Button type='submit' positive icon='checkmark' labelPosition='right' content='New Project!' />
                            </Form>
                        </div>
                            )
                }}
            </Mutation>
        )
    }
}




export default ProjectForm