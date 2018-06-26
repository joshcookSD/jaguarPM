import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Message, Form, Button,  } from 'semantic-ui-react';
import { CREATE_TEAM, getOrgByOwner } from '../../apollo-graphql/userQueries'
import decode from "jwt-decode";

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

class TeamForm extends Component {

    handleSubmit = (org, selected) => {
        this.props.handleAfterSubmit(org, selected);
    };

    state = {
        teamtitle: "",
        teamdescription: "",
        errors: {},
        teamtitleerror: "",
        activeView: this.props.activeView
    };

    render() {
        const {
            orgId,
            activeView,
        } = this.props;

        const {
            teamtitle,
            teamdescription,
            teamtitleerror
        } = this.state;

        const errorList = [];
        if (teamtitleerror) { errorList.push(teamtitleerror); }

        return (
            <Mutation mutation={CREATE_TEAM}>
                { (createTeam, { data }) => {
                    return (
                    <div style={{ marginBottom: '.5em' }}>
                        <Form
                            onSubmit={async e => {
                                e.preventDefault();
                                const response = await createTeam({
                                    variables: {
                                        teamdescription: teamdescription,
                                        teamtitle: teamtitle,
                                        organization: orgId,
                                        owner: userId
                                    },
                                    refetchQueries: [{
                                        query: getOrgByOwner,
                                        variables: {owner: userId }
                                    }]
                                });
                                const { ok, errors } = response.data.createTeam;
                                if (ok) {
                                    this.handleSubmit(activeView);
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
                                <label>Name</label>
                                <Form.Input
                                    placeholder="team title"
                                    value={teamtitle}
                                    type="text"
                                    id="teamtitle"
                                    name="teamtitle"
                                    fluid
                                    onChange={e => this.setState({ teamtitle: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <Form.Input
                                    placeholder="team description"
                                    value={teamdescription}
                                    type="text"
                                    id="team description"
                                    name="teamdescription"
                                    fluid
                                    onChange={e => this.setState({ teamdescription: e.target.value })}
                                />
                            </Form.Field>
                            <Button
                                type='submit'
                                color="grey"
                                positive
                                icon='checkmark'
                                labelPosition='right'
                                floated = 'right'
                                content='New Team!'
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

export default TeamForm;