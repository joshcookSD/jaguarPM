import React, {Component} from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Message, Form, Button, Input, Container, Header, Icon } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { CREATE_ORG } from '../../apollo-graphql/teamOrgQueries.js';

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

class OrgForm extends Component {
    state = {
        orgtitle: "",
        orgdescription: "",
        orgtitleError: "",
        errors: {},
    };

    render() {
        const { orgtitle, orgdescription, orgtitleError } = this.state;
        const errorList = [];
        if (orgtitleError) {errorList.push(orgtitleError);}

        return (
            <Mutation mutation={CREATE_ORG}>
                {(createOrganization, {data}) => (
                    <Container text>
                        <br/>
                        <Header as="h2">Create Organization</Header>
                        <Form
                            onSubmit={async e => {
                                e.preventDefault();
                              
                                const response = await createOrganization({
                                    variables: { orgdescription: orgdescription, orgtitle: orgtitle, owner: userId}
                                });
                                const {ok, errors,} = response.data.createOrganization;
                                if(ok) {
                                    alert('New Organization Created')
                                } else {
                                const err = {};
                                errors.forEach(({ path, message }) => {
                                    err[`${path}Error`] = message;
                                });
                                this.setState(err);
                                }
                            }}>

                            <Form.Field error={!!orgtitleError}>
                                <i className="material-icons prefix">group_add</i>
                                <Input
                                    placeholder="orgtitle"
                                    value={orgtitle}
                                    type="text"
                                    id="orgtitle"
                                    name="orgtitle"
                                    onChange={e => this.setState({ orgtitle: e.target.value })}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    placeholder="orgdescription"
                                    value={orgdescription}
                                    type="text"
                                    id="orgdescription"
                                    name="orgdescription"
                                    onChange={e => this.setState({ orgdescription: e.target.value })}
                                />
                            </Form.Field>
                            <Button floated='right' icon labelPosition='left'><Icon name='plus'/>create</Button>
                        </Form>
                        {errorList.length ? (
                            <Message error header="There was some errors with your submission" list={errorList} />
                        ) : null}
                    </Container>
                )}
            </Mutation>
        );
    };
}

export default OrgForm;
