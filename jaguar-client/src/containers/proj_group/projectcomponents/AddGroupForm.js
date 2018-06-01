import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Message, Form, Button, Input, Icon } from 'semantic-ui-react';
import { createGroup } from '../../apollo-graphql/groupProjectQueries'

class AddGroupForm extends Component {
    state = {
        grouptitle: "",
        groupdescription: "",
        errors: {},
        grouptitleerror: ""
    };

    render() {
        const {
            selectedProject,
            selectTeam,
            projectDetails,
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
                {(createGroup, { data }) => (
                    <div style={{ marginBottom: '.5em' }}>
                        <Form
                            onSubmit={async e => {
                                e.preventDefault();
                                // const response = await createGroup({
                                await createGroup({
                                    variables: {
                                        grouptitle: grouptitle,
                                        groupdescription: groupdescription,
                                        project: selectedProject,
                                        team: selectTeam,
                                        users: userId
                                    },
                                    refetchQueries: [{
                                        query: projectDetails,
                                        variables: queryVariables
                                    }]
                                });
                                 this.setState({
                                            grouptitle: "",
                                            groupdescription: "",
                                            errors: {},
                                            teamtitleerror: ""
                                        })
                                // const { ok, errors, } = response.data.createTeam;
                                // if (ok) {
                                //     this.setState({
                                //         teamtitle: "",
                                //         teamdescription: "",
                                //         errors: {},
                                //         teamtitleerror: ""
                                //     })
                                // } else {
                                //     const err = {};
                                //     errors.forEach(({ path, message }) => {
                                //         err[`${path}Error`] = message;
                                //     });
                                //     this.setState(err);
                                // }
                            }}>
                            <Form.Field error={!!grouptitleerror}>

                                <i className="material-icons prefix">group_add</i>
                                <Input
                                    placeholder="group title"
                                    value={grouptitle}
                                    type="text"
                                    id="grouptitle"
                                    name="grouptitle"
                                    fluid
                                    onChange={e => this.setState({ grouptitle: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder="group description"
                                    value={groupdescription}
                                    type="text"
                                    id="groupdescription"
                                    name="groupdescription"
                                    fluid
                                    onChange={e => this.setState({ groupdescription: e.target.value })}
                                />
                            </Form.Field>
                            <Button floated='right' icon labelPosition='left'><Icon name='plus' />Add Group</Button>
                        </Form>
                        {errorList.length ? (
                            <Message error header="There was some errors with your submission" list={errorList} />
                        ) : null}
                    </div>
                )}
            </Mutation>
        );
    };
}

export default AddGroupForm;