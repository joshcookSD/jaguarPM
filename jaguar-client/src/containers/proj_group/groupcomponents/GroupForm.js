import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button, Message } from 'semantic-ui-react';
import { createGroup } from '../../apollo-graphql/groupProjectQueries'

class GroupForm extends Component {
    state = {
        grouptitle: "",
        groupdescription: "",
        errors: {},
        grouptitleerror: ""
    };

    render() {
        const {
            project,
            team,
            updateQuery,
            queryVariables,
            userId
        }  = this.props;

        const {
            grouptitle,
            groupdescription,
            grouptitleerror
        } = this.state;

        const errorList = [];
        if (grouptitleerror) { errorList.push(grouptitleerror); }
        return (

            <Mutation mutation={createGroup}>
                {(createGroup, { data }) => {
                    return (
                        <div style={{ marginBottom: '.5em' }}>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    console.log(queryVariables);
                                    await createGroup({
                                        variables: {
                                            grouptitle: grouptitle,
                                            groupdescription: groupdescription,
                                            project: project,
                                            team: team,
                                            users: userId
                                        },
                                        refetchQueries: [{
                                            query: updateQuery,
                                            variables: queryVariables
                                        }]
                                    });
                                    this.setState({
                                        grouptitle: "",
                                        groupdescription: "",
                                        errors: {},
                                        grouptitleerror: ""
                                    })
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
                                        labelPosition='right'
                                        content='New Group!'
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
                }
                }

export default GroupForm;