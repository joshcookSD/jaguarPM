import React, { Component } from 'react';
import gql from "graphql-tag";
// import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";
import { Message, Form, Button, Input, Container, Header, Icon, } from 'semantic-ui-react';
import decode from 'jwt-decode';
import {getOrgByOwner} from '../apollo-graphql/userQueries'
const token = localStorage.getItem('token');

const CREATE_TEAM = gql`
    mutation createTeam( $teamtitle: String!, $teamdescription: String, $owner: String, $organization: String!) {
        createTeam(teamtitle: $teamtitle, teamdescription: $teamdescription, owner: $owner, organization: $organization) {
            ok
            errors {
                path
                message
            }
        }
    }`;

const { user } = decode(token);

class TeamForm extends Component {
    state = {
        teamtitle: "",
        teamdescription: "",
        errors: {},
        teamtitleerror: ""
    };

    render() {
        const {orgId} = this.props;
        const { teamtitle, teamdescription, teamtitleerror } = this.state;
        const errorList = [];
        if (teamtitleerror) { errorList.push(teamtitleerror); }

        return (
            <Mutation mutation={CREATE_TEAM}>
                {(createTeam, { data }) => (
                    <Container  text>
                        <Form
                            onSubmit={async e => {
                                e.preventDefault();                 
                                const response = await createTeam({
                                    variables: { teamdescription: teamdescription, teamtitle: teamtitle, organization: orgId, owner: user._id },
                                    refetchQueries: [{ query: getOrgByOwner, variables: {owner: user._id }}]
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
                                    value={teamtitle}
                                    type="text"
                                    id="teamtitle"
                                    name="teamtitle"
                                    fluid
                                    onChange={e => this.setState({ teamtitle: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder="team description"
                                    value={teamdescription}
                                    type="text"
                                    id="team description"
                                    name="teamdescription"
                                    fluid
                                    onChange={e => this.setState({ teamdescription: e.target.value })}
                                />
                            </Form.Field>   
                            <Button floated='right' icon labelPosition='left'><Icon name='plus' />create</Button>
                        </Form>
                        {errorList.length ? (
                            <Message error header="There was some errors with your submission" list={errorList} />
                        ) : null}
                    </Container>
                )}
            </Mutation>
        );
    };
}

export default TeamForm;
