import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button, Dimmer, Loader  } from 'semantic-ui-react';
import {
    getOrgByOwner,
    createTeam,
    teamsByOwner,
    teamsByUser,
    userTaskDetails
} from '../../../apollo-graphql/userQueries'
import {userTeamProjects} from '../../../apollo-graphql/groupProjectQueries'
import {
    AdminFormWrapper
} from '../../../layout/AdminComponents.js'
import decode from 'jwt-decode';
const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;


class TeamForm extends Component {
    state = {
        teamtitle: "",
        teamdescription: "",
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
        } = this.state;

        return (
            <Mutation mutation={createTeam}>
                { (createTeam, {loading}) => {
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
                                    // const response = await
                                    createTeam({
                                        variables: {
                                            teamdescription: teamdescription,
                                            teamtitle: teamtitle,
                                            organization: orgId,
                                            owner: userId
                                        },
                                        refetchQueries: [
                                            {query: getOrgByOwner, variables: {owner: userId }},
                                            {query: teamsByOwner, variables: {owner: userId }},
                                            {query: teamsByUser, variables: { user: userId }},
                                            {query: userTeamProjects, variables: { _id: userId }},
                                            {query: userTaskDetails, variables: { _id: userId }},
                                        ]
                                    });
                                    this.props.handleAfterSubmit(activeView);
                                    this.setState({
                                        teamtitle: "",
                                        teamdescription: "",
                                    })
                                }}>
                                <Form.Field>
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
                        </AdminFormWrapper>
                    )
                }}
            </Mutation>
        );
    };
}

export default TeamForm;