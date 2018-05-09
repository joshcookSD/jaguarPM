import React from 'react';
import { Card, List } from 'semantic-ui-react';
import DropdownSelection from './OrgInvite.jsx';

const OrgAddUserCard = (props) => (
    <Card className="cardRight">
            <h3 className="orgCardTitle">Add User To Organization</h3>
            <DropdownSelection orgId={props.orgId} getOrgByOwner={props.getOrgByOwner} variables={props.variables} />
            {props.org.users.map(user => (
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

export default OrgAddUserCard;