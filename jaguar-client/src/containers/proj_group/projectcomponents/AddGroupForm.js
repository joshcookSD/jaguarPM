import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Message, Form, Button, Input, Icon } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { createGroup } from '../../apollo-graphql/groupProjectQueries'


const token = localStorage.getItem('token');
const { user } = decode(token);

class AddGroupForm extends Component {
    state = {
        grouptitle: "",
        groupdescription: "",
        errors: {},
        teamtitleerror: ""
    };

    render() {
        const { selectedProject, selectTeam, userTeams }  = this.props;
        const { grouptitle, groupdescription, teamtitleerror } = this.state;
        const errorList = [];
        if (teamtitleerror) { errorList.push(teamtitleerror); }
        return (
            <Mutation mutation={createGroup}>
                {(createGroup, { data }) => (
                    <div style={{ marginBottom: '.5em' }}>
                        <Form
                            onSubmit={async e => {
                                e.preventDefault();
                                const response = await createGroup({
                                    variables: {  grouptitle: grouptitle, groupdescription: groupdescription, project: selectedProject, team: selectTeam },
                                    refetchQueries: [{ query: userTeams, variables: { owner: user._id } }]
                                });
                                const { ok, errors, } = response.data.createTeam;
                                if (ok) {
                                    this.setState({
                                        teamtitle: "",
                                        teamdescription: "",
                                        errors: {},
                                        teamtitleerror: ""
                                    })
                                } else {
                                    const err = {};
                                    errors.forEach(({ path, message }) => {
                                        err[`${path}Error`] = message;
                                    });
                                    this.setState(err);
                                }
                            }}>
                            <Form.Field error={!!teamtitleerror}>

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