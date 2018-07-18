import React, {Component} from 'react'
import { Mutation } from "react-apollo";
import { Message, Button, Form } from 'semantic-ui-react'
import {createProject} from "../../apollo-graphql/groupProjectQueries";

class ProjectFormForModal extends Component {

    onClose = () => {
        this.props.onClose();
    };

    state = {
        projecttitle: "",
        projectdescription: "",
        errors: {},
        projecttitleerror: "",

    };

    render() {
        const {
            team,
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
                {(createProject) => {
                    return (
                        <div style={{ marginBottom: '.5em' }}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    // const response = await
                                        createProject({
                                        variables: {
                                            projecttitle: projecttitle,
                                            projectdescription: projectdescription,
                                            team: team,
                                            leader: variables._id,
                                            users: variables._id
                                        },
                                        refetchQueries: [{
                                            query: this.props.updateQuery,
                                            variables: variables
                                        }]
                                    });
                                    // const { ok, errors } = response.data.createProject;
                                    // if (ok) {
                                    //     this.handleSubmit(activeView);
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
                        </div>
                    )
                }}
            </Mutation>
        );
    };
}

export default ProjectFormForModal