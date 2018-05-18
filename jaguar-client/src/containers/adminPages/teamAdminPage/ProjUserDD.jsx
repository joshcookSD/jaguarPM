import React from 'react';
import { Card, List } from 'semantic-ui-react';
import DropdownSelection from './teamInvite';

const ProjUserDD = (props) => (
        <Card className="cardRight">
                <DropdownSelection teamId={props.teamId} teamsByOwner={props.teamsByOwner} variables={props.variables} />
                {props.team.users.map(user => (
                            <List>
                                <List.Item>
                                    <List.Content>
                                        <List.Header as='a'><List.Icon name='user' />{user.username}</List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                ))}
        </Card>
);

export default ProjUserDD;
