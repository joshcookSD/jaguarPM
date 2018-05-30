import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import {Link} from 'react-router-dom';
import { Form, Message, Button, Container, Header, Icon } from 'semantic-ui-react';
import Navbar from "../Navbar";
import {addUser} from "../apollo-graphql/userQueries";


class SignUpForm extends Component {
    state = {
        username: "",
        usernameError: "",
        password: "",
        passwordError: "",
        showPassword: false,
        email: "",
        emailError: "",
    };

    showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({showPassword: !this.state.showPassword})
    };


    render() {
        const {email, username, password, usernameError, emailError, passwordError, showPassword} = this.state;
        const errorList = [];

        if (usernameError) {errorList.push(usernameError);}
        if (emailError) { errorList.push(emailError);}
        if (passwordError) {errorList.push(passwordError);}

        return (
            <Mutation mutation={addUser}>
            {(signup, {data, loading, error}) => {
            return (
                <div>
                <Navbar/>
                <Container text style={{ marginTop: '7em' }}>
                    <Header as="h2">sign up</Header>
                        <Form onSubmit={async e => {
                            e.preventDefault();

                            const response = await signup({
                                variables: {username, password, email}
                            });
                            const { ok, token, refreshToken, errors } = response.data.signup;

                            if (ok) {
                                console.log(token);
                                localStorage.setItem('token', token);
                                localStorage.setItem('refreshToken', refreshToken);
                                this.props.history.push('/view');
                            } else {
                                const err = {};
                                errors.forEach(({ path, message }) => {
                                    // err['passwordError'] = 'too long..';
                                    err[`${path}Error`] = message;
                                });
                                this.setState(err);
                            }
                        }}>

                            <Form.Field error={!!emailError}>
                                <Form.Input
                                    autoFocus
                                    fluid
                                    placeholder="email"
                                    label="email"
                                    value={this.state.email}
                                    type="text"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Form.Field>

                            <Form.Field error={!!usernameError}>
                                <Form.Input
                                    placeholder="username"
                                    label="username"
                                    value={this.state.username}
                                    type="text"
                                    onChange={e => this.setState({ username: e.target.value })}
                                    fluid
                                />
                            </Form.Field>

                            <Form.Field error={!!passwordError}>
                                <Form.Input
                                    icon
                                    placeholder="password"
                                    label='password'
                                    value={this.state.password}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={e => this.setState({ password: e.target.value })}
                                    fluid
                                >
                                    <input/>
                                    <div style={{marginLeft: 5+'px', marginTop: 7+'px'}} onClick={ this.showHide }><Icon name={showPassword ? 'hide' : 'unhide'} /></div>
                                </Form.Input>
                            </Form.Field>
                            <Link to='/login' >already have an account?</Link>
                            <Button icon size="small" floated='right' labelPosition='left' type="submit"><Icon name='fire'/>Signup</Button>
                        </Form>
                    {errorList.length ? (
                        <Message error header="There was some errors with your submission" list={errorList} />
                    ) : null}

                </Container>
                </div>
            )
        }}
    </Mutation>
        );
    };
}

export default SignUpForm;
