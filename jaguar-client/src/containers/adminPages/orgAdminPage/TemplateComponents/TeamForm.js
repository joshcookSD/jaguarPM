import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button, Dimmer, Loader  } from 'semantic-ui-react';
import {AdminFormWrapper} from '../../../layout/AdminComponents.js'
import decode from 'jwt-decode';
import gql from "graphql-tag";
// import getOrgByOwner from '../OrgPageMain.js';
const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

export const getOrgByOwner = gql`
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


const createTeam = gql`
    mutation createTeam( $teamtitle: String!, $teamdescription: String, $owner: String, $organization: String!) {
        createTeam(teamtitle: $teamtitle, teamdescription: $teamdescription, owner: $owner, organization: $organization) {
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
    }`;


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
                    // if (loading) return (
                    //     <div>
                    //         <Dimmer active>
                    //             <Loader/>
                    //         </Dimmer>
                    //     </div>
                    // );
                    return (
                        <AdminFormWrapper>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createTeam({
                                        variables: {
                                            teamdescription: teamdescription,
                                            teamtitle: teamtitle,
                                            organization: orgId,
                                            owner: userId
                                        },
                                        update: async (store, { data: newTeam }) => {
                                            const data = store.readQuery({query: getOrgByOwner, variables: {owner: userId} });
                                            let currentOrg = data.getOrgByOwner.find(org => org._id === orgId);
                                            let newTeamForCache = newTeam.createTeam;
                                            await currentOrg.teams.push(newTeamForCache);
                                            await store.writeQuery({
                                                query: getOrgByOwner,
                                                variables: {owner: userId},
                                                data: data
                                            });
                                        }
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