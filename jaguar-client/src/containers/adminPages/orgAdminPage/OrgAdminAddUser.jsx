import React, { Component } from 'react';
import {  Icon } from 'semantic-ui-react';
import DropdownSelection from './OrgInvite.jsx';
import { removeOrgUser } from '../../apollo-graphql/teamOrgQueries.js'
import { getOrgByOwner } from '../../apollo-graphql/userQueries'
import { Mutation } from "react-apollo";
import {
    UserWrapper,
    ImageWrapper,
    CardRight,
    NewUserCardName,
    DeleteUserIcon
} from '../../layout/AdminComponents.js'

class OrgAddUserCard extends Component {
    render(){
        const {
            orgId,
            variables,
            teamsToRemove,
            org
        } = this.props;

        return (
            <Mutation mutation={removeOrgUser}>
                {(removeOrgUser, { data }) => (
                <CardRight>
                    <DropdownSelection
                        orgId={this.props.orgId}
                        getOrgByOwner={this.props.getOrgByOwner}
                        variables={this.props.variables}
                    />
                    {(org.users || []).map((user, i) => (
                        <UserWrapper image key={i}>
                            <ImageWrapper src='http://i.pravatar.cc/300' />
                            <NewUserCardName>{user.username}</NewUserCardName>
                            <DeleteUserIcon>
                                <Icon
                                    size='large'
                                    name='delete'
                                    onClick={async e => {
                                        e.preventDefault();
                                        await removeOrgUser({
                                            variables: { _id: orgId, user: user._id, teamId: teamsToRemove },
                                            refetchQueries: [{ query: getOrgByOwner, variables: variables }]
                                        });
                                    }}
                                />
                            </DeleteUserIcon>
                        </UserWrapper>
                    ))}
                </CardRight>
            )}
        </Mutation>
        )
    }
}


export default OrgAddUserCard;
