import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import gql from "graphql-tag";

const getOrgByOwner = gql`
    query getOrgByOwner($owner: String ){
    getOrgByOwner(owner: $owner ){
          _id
      orgtitle
      orgdescription
    	users{
        _id
        username
        profileImageUrl
      }
          teams{
            _id
            teamtitle
            teamdescription
             defaultproject{
                _id
                projecttitle
                defaultgroup{
                  grouptitle
                  _id
                }
              }
            organization{
                _id
                orgtitle
              }
              users{
                _id
                username
                profileImageUrl
              }
              projects{
                _id
                projecttitle
              }
              tasks{
                _id
                tasktitle
              }
              groups{
                _id
                grouptitle
                tasks{
                _id
                tasktitle
                }
              }
        }
          owner{
          username
          }
        }
        
}`;

const allUsers = gql `
{
  allUsers{
      _id
    username
  }
}
`;

const addOrgUser = gql`
    mutation addOrgUser($_id: String $user: String) {
        addOrgUser(_id: $_id, user: $user){
            _id
            username
            profileImageUrl
        }
    }`;

class DropdownSelection extends Component {
    render() {
        const { orgId, variables } = this.props;
        return (
            <Query query={allUsers} >
                {({ loading, error, data }) => {
                    let friendOptions = (data.allUsers || []).map(user => ({ text: user.username, _id: user._id }));
                    return (
                        <Mutation mutation={addOrgUser}>
                            {(addOrgUser) => (
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
                                                    await addOrgUser({
                                                        variables: {
                                                            _id: orgId,
                                                            user: option._id
                                                        },
                                                        update: async (store, { data: newUser }) => {
                                                            const data = store.readQuery({query: getOrgByOwner, variables: variables  });
                                                            let currentOrg = data.getOrgByOwner.find(org => org._id === orgId);
                                                            let newUserForCache = newUser.addOrgUser;
                                                            await currentOrg.users.push(newUserForCache);
                                                            await store.writeQuery({
                                                                query: getOrgByOwner,
                                                                variables: variables,
                                                                data: data
                                                            });
                                                        }
                                                    });
                                                    this.props.handleAfterSubmit(orgId);
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