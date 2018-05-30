import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Mutation, graphql, compose } from "react-apollo";
import { Message, Form, Button, Container, Header, Icon } from 'semantic-ui-react';
import Navbar from "../Navbar";
import {loginUser, getCurrentUser} from "../apollo-graphql/userQueries";

class AuthForm extends Component {
    state = {
            password: "",
            email: "",
            emailError: "",
            passwordError: "",
            showPassword: false,
            errors: {},
        };

    showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({showPassword: !this.state.showPassword})
    };

    render() {
        const { email, password, emailError, passwordError, showPassword } = this.state;
        const errorList = [];
        if (emailError) {errorList.push(emailError);}
        if (passwordError) {errorList.push(passwordError);}

        return (
            <Mutation mutation={loginUser}>
                {(login, {data}) => (
                    <div>
                    <Navbar/>
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as="h2">login</Header>
                        <Form
                            onSubmit={async e => {

                                e.preventDefault();
                                const response = await login({
                                    variables: {password: password,email: email}
                                });
                                    const {ok, token, refreshToken, errors,} = response.data.login;
                                if (ok) {
                                    localStorage.setItem('token', token);
                                    localStorage.setItem('refreshToken', refreshToken);
                                    this.props.history.push('/view');
                                } else {
                                    const err = {};
                                    errors.forEach(({ path, message }) => {
                                        err[`${path}Error`] = message;
                                    });
                                    this.setState(err);
                                }
                            }}>

                            <Form.Field error={!!emailError}>
                                <Form.Input
                                    placeholder='email'
                                    value={email}
                                    type='text'
                                    label='email'
                                    name='email'
                                    fluid
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field error={!!passwordError}>
                                <Form.Input
                                    placeholder='password'
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    name='password'
                                    label='password'
                                    fluid
                                    onChange={e => this.setState({ password: e.target.value })}
                                >
                                <input/>
                                    <div style={{marginLeft: 5+'px', marginTop: 7+'px'}} onClick={ this.showHide }><Icon name={showPassword ? 'hide' : 'unhide'} /></div>
                                </Form.Input>
                            </Form.Field>
                            <Button floated='right' icon labelPosition='left'><Icon name='plus'/>login</Button>
                        </Form>
                        <Link to='/signup'> need to create an account?</Link>
                        {errorList.length ? (
                            <Message error header='There was some errors with your submission' list={errorList} />
                        ) : null}
                    </Container>
                    </div>
                )}
            </Mutation>

        );
    };
}

export default compose(
    graphql(getCurrentUser,{
        props: ({data: { CurrentUser, loading }}) => ({
            CurrentUser,
            loading
        })
    })
)(AuthForm);
