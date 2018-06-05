import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import { allUsers, addOrgUser } from "../../apollo-graphql/userQueries";


class DropdownSelection extends Component {

    render() {

        const {
            orgId,
            variables,
            getOrgByOwner
        } = this.props;
        
        return (
            <Query query={allUsers} >
                {({ loading, error, data }) => {
                    let friendOptions = (data.allUsers || []).map(user => ({ text: user.username, _id: user._id }))                                     
                    return (
                        <Mutation mutation={addOrgUser}>
                            {(addOrgUser, { data }) => (
                                <Dropdown color='Green 'text='Add user' icon='add user' scrolling floating fluid labeled button className='icon'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header content='People You Might Know' />
                                        {friendOptions.map((option, i) =>
                                            <Dropdown.Item
                                                key={i}
                                                value={option._id}
                                                {...option}
                                                onClick={async e => {
                                                    e.preventDefault();
                                                    await addOrgUser({
                                                        variables: {
                                                            _id: orgId,
                                                            user: option._id
                                                        },
                                                        refetchQueries: [{
                                                            query: getOrgByOwner,
                                                            variables: variables
                                                        }]
                                                    });
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