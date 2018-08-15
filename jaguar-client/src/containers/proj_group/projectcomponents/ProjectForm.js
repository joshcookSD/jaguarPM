import React, {Component} from 'react'
import { Mutation } from "react-apollo";
import { Message, Button, Form, Loader, Dimmer } from 'semantic-ui-react'
import {createProject} from "../../apollo-graphql/groupProjectQueries";
import { teamsByOwner } from "../../apollo-graphql/userQueries";
import {
    AdminFormWrapper
} from '../../layout/AdminComponents.js'

class ProjectForm extends Component {

    handleSubmit = (team) => {
        this.props.handleAfterSubmit(team);
    };

    state = {
        projecttitle: "",
        projectdescription: "",
        errors: {},
        projecttitleerror: "",
        activeView: this.props.activeView
    };

    render() {
        const {
            teamId,
            variables,
            activeView,
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
                {(createProject, { data, loading }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    return (
                        <AdminFormWrapper>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    // const response = await
                                        createProject({
                                        variables: {
                                            projecttitle: projecttitle,
                                            projectdescription: projectdescription,
                                            team: teamId,
                                            leader: variables.owner,
                                            users: variables.owner
                                        },
                                        refetchQueries: [{
                                            query: teamsByOwner,
                                            variables: variables
                                        }]
                                    });
                                    // const { ok, errors } = response.data.createProject;
                                    // if (ok) {
                                        this.handleSubmit(activeView);
                                        this.setState({
                                            projecttitle: "",
                                            projectdescription: "",
                                            errors: {},
                                            projecttitleerror: ""
                                        });
                                    // } else {
                                    //     const err = {};
                                    //     errors.forEach(({ path, message }) => {
                                    //         err[`${path}Error`] = message;
                                    //     });
                                    //     this.setState(err);
                                    // }
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
                            {errorList.length ? (
                                <Message error header="There was some errors with your submission" list={errorList} />
                            ) : null}
                        </AdminFormWrapper>
                    )
                }}
            </Mutation>
        );
    };
}

export default ProjectForm