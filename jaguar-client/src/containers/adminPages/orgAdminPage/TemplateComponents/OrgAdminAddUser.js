import React, { Component } from 'react';
import {  Icon, Dimmer, Loader } from 'semantic-ui-react';
import DropdownSelection from './OrgInvite.js';
import { removeOrgUser } from '../../../apollo-graphql/teamOrgQueries.js'
import { getOrgByOwner } from '../../../apollo-graphql/userQueries'
import { Mutation } from "react-apollo";
import {
    UserWrapper,
    ImageWrapper,
    CardRight,
    NewUserCardName,
    DeleteUserIcon
} from '../../../layout/AdminComponents.js'

class OrgAddUserCard extends Component {
    render(){
        const {
            orgId,
            variables,
            teamsToRemove,
        } = this.props;

        return (
            <Mutation mutation={removeOrgUser}>
            {(removeOrgUser, { data, loading }) => {
                if (loading) return (
                    <div>
                        <Dimmer active>
                            <Loader/>
                        </Dimmer>
                    </div>
                );
                return (
                    <CardRight>
                        <DropdownSelection
                            orgId={this.props.orgId}
                            variables={this.props.variables}
                            getOrgByOwner={getOrgByOwner}
                        />
                        {(this.props.orgData || []).map(org => {
                            if (org._id === this.props.org._id) {
                                return (
                                    (org.users).map((user, i) => (
                                        <UserWrapper image key={i}>
                                            <ImageWrapper src='http://i.pravatar.cc/300'/>
                                            <NewUserCardName>{user.username}</NewUserCardName>
                                            <DeleteUserIcon>
                                                <Icon
                                                    size='large'
                                                    name='delete'
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        if(loading){
                                                            console.log('loading')
                                                        }
                                                        await removeOrgUser({
                                                            variables: {_id: orgId, user: user._id, teamId: teamsToRemove},
                                                            refetchQueries: [{query: getOrgByOwner, variables: variables}]
                                                        });
                                                    }}
                                                />
                                            </DeleteUserIcon>
                                        </UserWrapper>
                                    )
                                ))
                            }
                        })}
                    </CardRight>
                )
            }}
        </Mutation>
        )
    }
}


export default OrgAddUserCard;
