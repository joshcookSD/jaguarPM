import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button, Message } from 'semantic-ui-react';
import gql from "graphql-tag";

const userProjectGroups = gql`
    query user($_id: String ){
    user(_id: $_id){
       projects {
            _id
            projecttitle
            projectdescription
            team {
                _id
                teamtitle
            }
            groups {
                _id
                grouptitle
                groupdescription
                project{
                    _id
                    team{
                        _id
                    }
                }
                users{
                    _id
                }
                team{
                    _id
                    teamtitle
                }
            }
       } 
    }
}`;

const createGroup = gql`
mutation createGroup(
    $grouptitle: String,
    $groupdescription: String,
    $team: String!,
    $project: String,
    $users: String
) { createGroup(
        grouptitle: $grouptitle,
        groupdescription: $groupdescription,
        team: $team,
        project: $project,
        users: $users
        ) {
            _id
            grouptitle
            groupdescription
            project{
                _id
                team{
                    _id
                }
            }
            users{
                _id
            }
            team{
                _id
                teamtitle
            }
        }
}`;

class GroupForm extends Component {
    state = {
        grouptitle: "",
        groupdescription: "",
        errors: {},
        grouptitleerror: ""
    };

    render() {
        const {project, team, userId}  = this.props;
        const {grouptitle, groupdescription, grouptitleerror
        } = this.state;

        const errorList = [];
        if (grouptitleerror) { errorList.push(grouptitleerror); }
        console.log(project)
        return (

            <Mutation mutation={createGroup}>
                {(createGroup, { data }) => {
                    return (
                        <div style={{ marginBottom: '.5em' }}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createGroup({
                                        variables: {
                                            grouptitle: grouptitle,
                                            groupdescription: groupdescription,
                                            project: project,
                                            team: team,
                                            users: userId
                                        },
                                        update: async (store, {data: newGroup}) => {
                                            const data = store.readQuery({query: userProjectGroups, variables: {_id: userId}});
                                            let currentProject = data.user.projects.find(proj => proj._id === project);
                                            currentProject.groups.push(newGroup.createGroup);
                                            await store.writeQuery({
                                                query: userProjectGroups,
                                                variables: {_id: userId},
                                                data: data
                                            });
                                        }
                                    });
                                    this.setState({
                                        grouptitle: "",
                                        groupdescription: "",
                                        errors: {},
                                        grouptitleerror: ""
                                    });
                                    this.props.onClose()
                                }}>
                                    <Form.Field error={!!grouptitleerror}>
                                        <label>Name</label>
                                        <Form.Input
                                            placeholder="Group title"
                                            value={grouptitle}
                                            type="text"
                                            id="grouptitle"
                                            name="grouptitle"
                                            onChange={e => this.setState({ grouptitle: e.target.value })}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Description</label>
                                        <Form.Input
                                            placeholder="Group description"
                                            value={groupdescription}
                                            type="text"
                                            id="groupdescription"
                                            name="groupdescription"
                                            onChange={e => this.setState({ groupdescription: e.target.value })}
                                        />
                                    </Form.Field>
                                        <Button
                                            type='submit'
                                            color="grey"
                                            positive
                                            icon='checkmark'
                                            content='New Group!'
                                            floated={'right'}
                                        />
                                <Form.Field></Form.Field>
                                    </Form>
                                {errorList.length ? (
                                    <Message error header="There was some errors with your submission" list={errorList} />
                                    ) : null}
                                    </div>
                                    )
                                    }}
                        </Mutation>
                );
                }
                }

export default GroupForm;