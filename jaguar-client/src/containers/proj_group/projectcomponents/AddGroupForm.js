import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Message, Form, Button, Input, Icon } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { getOrgByOwner, CREATE_TEAM} from '../../apollo-graphql/userQueries'


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
        const { orgId } = this.props;
        const { grouptitle, groupdescription, teamtitleerror } = this.state;
        const errorList = [];
        if (teamtitleerror) { errorList.push(teamtitleerror); }

        return (
            <Mutation mutation={CREATE_TEAM}>
                {(createTeam, { data }) => (


                    <div style={{ marginBottom: '.5em' }}>
                        <Form
                            onSubmit={async e => {
                                e.preventDefault();
                                const response = await createTeam({
                                    variables: { groupdescription: groupdescription, grouptitle: grouptitle, organization: orgId, owner: user._id },
                                    refetchQueries: [{ query: getOrgByOwner, variables: { owner: user._id } }]
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
                                    placeholder="team title"
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
                                    placeholder="team description"
                                    value={groupdescription}
                                    type="text"
                                    id="team description"
                                    name="groupdescription"
                                    fluid
                                    onChange={e => this.setState({ groupdescription: e.target.value })}
                                />
                            </Form.Field>
                            <Button floated='right' icon labelPosition='left'><Icon name='plus' />Add Team</Button>
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