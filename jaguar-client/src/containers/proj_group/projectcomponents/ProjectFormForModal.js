 import React, {Component} from 'react'
import { Mutation } from "react-apollo";
import { Button, Form, Dimmer, Loader } from 'semantic-ui-react'
import {createProject, userProjectGroups} from "../../apollo-graphql/groupProjectQueries";


class ProjectFormForModal extends Component {

    state = {
        projecttitle: "",
        projectdescription: "",
        errors: {},
        projecttitleerror: "",
    };

    render() {
        const {
            teamId,
            variables,
        } = this.props;

        const {
            projecttitle,
            projectdescription,
            projecttitleerror
        } = this.state;

        const errorList = [];
        if (projecttitleerror) { errorList.push(projecttitleerror); }

        return (
            <Mutation mutation={createProject}>
                {(createProject, {loading}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    return (
                        <div style={{ marginBottom: '.5em' }}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createProject({
                                        variables: {
                                            projecttitle: projecttitle,
                                            projectdescription: projectdescription,
                                            team: teamId,
                                            leader: variables._id,
                                            users: variables._id
                                        },
                                        refetchQueries: [
                                            {query: this.props.updateQuery, variables: variables},
                                            {query: userProjectGroups, variables: variables},
                                        ]
                                    });

                                        this.setState({
                                            projecttitle: "",
                                            projectdescription: "",
                                            errors: {},
                                            projecttitleerror: ""
                                        });
                                    this.props.onClose()
                                }}>
                                <Form.Field error={!!projecttitleerror}>
                                    <label>Name</label>
                                    <Form.Input
                                        placeholder='Project Name'
                                        value={projecttitle}
                                        type='text'
                                        id="newProject"
                                        name="newProject"
                                        fluid
                                        onChange={e => this.setState({ projecttitle: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <Form.Input
                                        placeholder='Project Description'
                                        value={projectdescription}
                                        type='text'
                                        id="project description"
                                        name="newProjectDescription"
                                        fluid
                                        onChange={e => this.setState({ projectdescription: e.target.value })}
                                    />
                                </Form.Field>
                                <Button
                                    type='submit'
                                    color="grey"
                                    positive
                                    icon='checkmark'
                                    labelPosition='right'
                                    floated = 'right'
                                    content='New Project!'
                                />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    };
}

export default ProjectFormForModal