import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation, graphql, compose } from "react-apollo";
import { Message, Form, Button, Input, Container, Header, Icon } from 'semantic-ui-react';
import { getCurrentUser } from "../apollo-graphql/userQueries";
import gql from 'graphql-tag';
import decode from 'jwt-decode';
const token = localStorage.getItem('token');


const UPDATE_USER = gql`
mutation update($_id: String!, $username: String, $profileImageUrl: String) {
 updateUser(_id: $_id, username: $username, profileImageUrl: $profileImageUrl) {
        _id
        username
        profileImageUrl 
  }
}
`;

const { user } = decode(token);

class UserView extends Component {
    state = {
        _id: user._id,
        email: user.email,
        username: "",
        profileImageUrl: "",
        PHusername: user.username,
        PHimage: user.profileImageUrl,
    };

    render() {
        const { _id, username, profileImageUrl, email, PHusername, PHimage } = this.state;
        console.log(user);
        
        const success = [];

        return(
            <Mutation mutation={UPDATE_USER}>
            {(update, { data, loading }) => {
            return (  
                <Container text style={{ marginTop: '7em' }}>
                    <Header as="h2">Update User</Header>
                        <Form onSubmit={async e => {
                            e.preventDefault();
                            const response = await update({
                                variables: { _id: user._id, username, profileImageUrl }
                            });
                            success.push(response.data)
                            console.log(success);
                        }}>
                        <Form.Field>
                               email: {user.email}
                        </Form.Field>

                        <Form.Field>
                            <input
                                placeholder={this.state.PHusername}
                                value={username}
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <input
                                placeholder={this.state.PHimage}
                                value={profileImageUrl}
                                onChange={e => this.setState({ profileImageUrl: e.target.value })}
                            />
                        </Form.Field>
                        <Button floated='right' type="submit"><i className="material-icons left">whatshot</i>Update</Button>
                     </Form>
                    {/* {success.length ? (
                        <Message> "hoooray" </Message>
                    ) : null} */}
                </Container>
            );
        }}
            </Mutation>
            );
        }
    }
                
                
export default UserView;