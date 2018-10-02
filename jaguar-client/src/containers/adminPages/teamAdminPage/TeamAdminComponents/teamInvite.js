
import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import { allUsers } from "../../../apollo-graphql/userQueries";
import gql from "graphql-tag";

const addTeamUser = gql`
    mutation addTeamUser( $_id: String, $user: String!) {
      addTeamUser(user: $user, _id: $_id) {
        _id
        username
        profileImageUrl
      }
     }`;


class DropdownSelection extends Component {
    render() {

        const {
            teamId,
            variables,
            teamsByOwner,
        } = this.props;

        return (
            <Query query={allUsers} >
                {({ loading, error, data }) => {
                    let friendOptions = (data.allUsers || []).map(user => ({ text: user.username, _id: user._id }))
                    return (
                        <Mutation mutation={addTeamUser}>
                            {(addTeamUser) => (
                                <Dropdown
                                    color='Green'
                                    text='Add user'
                                    icon='add user'
                                    scrolling
                                    labeled
                                    button
                                    className='icon'
                                    fluid
                                >
                                    <Dropdown.Menu>
                                        <Dropdown.Header content='People You Might Know' />
                                        {friendOptions.map((option, i) =>
                                            <Dropdown.Item
                                                key={i}
                                                value={option._id}
                                                {...option}
                                                onClick={async e => {
                                                    e.preventDefault();
                                                    await addTeamUser({
                                                        variables: {
                                                            _id: teamId,
                                                            user: option._id
                                                        },
                                                        update: async (store, { data: newUser }) => {
                                                            const data = store.readQuery({query: teamsByOwner, variables: variables  });
                                                            let currentTeam = data.teamsByOwner.find(team => team._id === teamId);
                                                            let newUserForCache = newUser.addTeamUser;
                                                            await currentTeam.users.push(newUserForCache);
                                                            await store.writeQuery({
                                                                query: teamsByOwner,
                                                                variables: variables,
                                                                data: data
                                                            });
                                                        }
                                                    });
                                                    this.props.handleAfterSubmit(teamId);
                                                }}
                                            />
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Mutation>
                    );
                }}
            </Query >
        );
    }
}


export default DropdownSelection