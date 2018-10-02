import React, {Component} from 'react'
import { Mutation } from "react-apollo";
import {  Button, Form, Loader, Dimmer } from 'semantic-ui-react'
import { AdminFormWrapper } from '../layout/AdminComponents.js'
import gql from "graphql-tag";

const createProject = gql`
mutation createProject(
    $projecttitle: String,
    $projectdescription: String,
    $team: String!,
    $leader: String!,
    $users: String
) { createProject(
    projecttitle: $projecttitle,
    projectdescription: $projectdescription,
    team: $team,
    leader: $leader,
    users: $users
) {
        _id
        projecttitle
        projectdescription
        team{
            _id
        }
        leader{
            _id
        }
        users{
            _id
        }
    }
}`;


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
            teamsByOwner
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
                                    await createProject({
                                        variables: {
                                            projecttitle: projecttitle,
                                            projectdescription: projectdescription,
                                            team: teamId,
                                            leader: variables.owner,
                                            users: variables.owner
                                        },
                                        update: async (store, { data: newProject }) => {
                                            const data = store.readQuery({query: teamsByOwner, variables: variables });
                                            let currentTeam = data.teamsByOwner.find(team => team._id === teamId);
                                            let newProjectForCache = newProject.createProject;
                                            await currentTeam.projects.push(newProjectForCache);
                                            await store.writeQuery({
                                                query: teamsByOwner,
                                                variables: {variables},
                                                data: data
                                            });
                                        }
                                    });
                                        this.handleSubmit(activeView);
                                        this.setState({
                                            projecttitle: "",
                                            projectdescription: "",
                                            errors: {},
                                            projecttitleerror: ""
                                        });
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
                        </AdminFormWrapper>
                    )
                }}
            </Mutation>
        );
    };
}

export default ProjectForm