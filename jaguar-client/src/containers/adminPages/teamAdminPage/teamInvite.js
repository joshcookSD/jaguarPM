
import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import { allUsers } from "../../apollo-graphql/userQueries";
import { addTeamUser } from '../../apollo-graphql/teamOrgQueries';


class DropdownSelection extends Component {

    render() {
        const { teamId, variables, teamsByOwner } = this.props;


        return (
            <Query query={allUsers} >
                {({ loading, error, data }) => {
                    let friendOptions = (data.allUsers || []).map(user => ({ text: user.username, _id: user._id }))
                    return (
                        <div className="dropDownDiv">
                            <Mutation mutation={addTeamUser}>
                                {(addTeamUser, { data }) => (
                                    <Dropdown text='Add user' icon='add user' scrolling floating fluid labeled button className='icon'>
                                        <Dropdown.Menu>
                                            <Dropdown.Header content='People You Might Know' />
                                            {friendOptions.map(option =>
                                                <Dropdown.Item
                                                    key={option.value}
                                                    value={option._id}
                                                    {...option}
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        await addTeamUser({
                                                            variables: { _id: teamId, user: option._id },
                                                            refetchQueries: [{ query: teamsByOwner, variables: variables }]
                                                        });
                                                    }}
                                                />)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </Mutation>
                        </div>
                    );
                }}
            </Query >
        );
    }
}


export default DropdownSelection