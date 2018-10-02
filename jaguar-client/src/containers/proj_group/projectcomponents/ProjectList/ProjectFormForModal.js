 import React, {Component} from 'react'
import { Mutation } from "react-apollo";
import { Button, Form, Dimmer, Loader } from 'semantic-ui-react'
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
           team {
            _id
            teamtitle
            organization{
                _id
                orgtitle
            }
            projects {
                _id
                projecttitle
                projectdescription
                groups{
                    _id
                    grouptitle
                }
                team {
                    _id
                    organization{
                        _id
                        orgtitle
                    }
                }
            } 
        }
    }
}`;

 const userTeamProjects = gql`
query user($_id: String ){
    user(_id: $_id){
        team {
            _id
            teamtitle
            organization{
                _id
                orgtitle
            }
            projects {
                _id
                projecttitle
                projectdescription
                groups{
                    _id
                    grouptitle
                }
                team {
                    _id
                    organization{
                        _id
                        orgtitle
                    }
                }
            } 
        }
    }
}`;

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
                                        update: async (store, {data: newProject}) => {
                                            const data = store.readQuery({query: userTeamProjects, variables: {_id: variables._id}  });
                                            let currentTeam = data.user.team.find(team => team._id === teamId);
                                            currentTeam.projects.push(newProject.createProject)
                                        }
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
                                        content='New Project!'
                                        floated={'right'}
                                    />
                                <Form.Field></Form.Field>
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    };
}

export default ProjectFormForModal