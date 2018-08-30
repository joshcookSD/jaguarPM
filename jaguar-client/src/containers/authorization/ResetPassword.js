import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Mutation, graphql, compose } from "react-apollo";
import { Message, Form, Button, Container, Header, Icon, Dimmer, Loader } from 'semantic-ui-react';
import Navbar from "../Navbar";
import {getOrgByOwner, teamsByOwner, teamsByUser, updatePassword, userTaskDetails} from "../apollo-graphql/userQueries";
import {userTeamProjects} from "../apollo-graphql/groupProjectQueries";

class ResetPassword extends Component {
    state = {
        username: '',
        email: '',
        newPassword: ''
    };

    render() {
        const { username, email, newPassword} = this.state;

        return (
            <Mutation mutation={updatePassword}>
                { (updatePassword, {loading}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    return (
                        <div>
                            <Navbar/>
                            <Container text style={{marginTop: '7em'}}>
                                <Header as="h2">forgot Password?</Header>
                                <Form
                                    onSubmit={async e => {
                                        e.preventDefault();
                                        updatePassword({
                                            variables: {
                                                username: username,
                                                newPassword: newPassword,
                                                email: email
                                            },
                                            // refetchQueries: [
                                            //
                                            // ]
                                        });
                                        this.setState({
                                                username : '',
                                                newPassword : '',
                                                email : ''
                                        })
                                    }}>
                                    <Form.Field>
                                        <Form.Input
                                            placeholder='email'
                                            value={email}
                                            type='text'
                                            label='email'
                                            name='email'
                                            fluid
                                            onChange={e => this.setState({email: e.target.value})}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <Form.Input
                                            placeholder='username'
                                            value={username}
                                            type='text'
                                            id='username'
                                            name='username'
                                            label='username'
                                            fluid
                                            onChange={e => this.setState({username: e.target.value})}
                                        >
                                            <input/>

                                        </Form.Input>
                                    </Form.Field>

                                    <Form.Field>
                                        <Form.Input
                                            placeholder='new password'
                                            value={newPassword}
                                            type='text'
                                            id='newPassword'
                                            name='newPassword'
                                            label='new password'
                                            fluid
                                            onChange={e => this.setState({newPassword: e.target.value})}
                                        >
                                            <input/>
                                        </Form.Input>
                                    </Form.Field>

                                    <Button
                                        floated='right'
                                        type='submit'
                                    >
                                        submit
                                    </Button>

                                </Form>
                                <div style={{'display': 'flex', 'flex-direction': 'column'}}>
                                </div>
                            </Container>
                        </div>
                    )
                }}
            </Mutation>
        );
    };
}

export default ResetPassword