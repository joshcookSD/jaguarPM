import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import {createGroup} from "../../apollo-graphql/groupProjectQueries";

class ProjectForm extends Component {
    state = {
        newGroup: "",
        newGroupDescription: "",
    };

    render() {
        const { team, teamsByOwner, variables } = this.props;
        const { newGroup, newGroupDescription } = this.state;
        return (
            <Mutation mutation={createGroup}>
                {(createGroup, { data }) => {
                    return (
                        <div style={{ marginBottom: '.5em' }}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createGroup({
                                        variables: { grouptitle: newGroup, groupdescription: newGroupDescription, team, leader: variables.owner, users: variables.owner },
                                        refetchQueries: [{ query: teamsByOwner, variables: variables }]
                                    });
                                    // this.props.onClose();
                                    this.setState({ newGroup: "", newGroupDescription: "" });
                                }}
                            >
                                <Form.Field>
                                    <label>Name</label>
                                    <Form.Input
                                        placeholder='Group Name'
                                        value={newGroup}
                                        type='text'
                                        onChange={e => this.setState({ newGroup: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <Form.Input
                                        placeholder='Group Description'
                                        value={newGroupDescription}
                                        type='text'
                                        onChange={e => this.setState({ newGroupDescription: e.target.value })}
                                    />
                                </Form.Field>
                                <Button type='submit' color="Grey" positive icon='checkmark' labelPosition='right' content='New Group!' />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default ProjectForm