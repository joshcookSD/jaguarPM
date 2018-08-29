import React, { Component } from 'react';
import {  Icon, Loader, Dimmer } from 'semantic-ui-react';
import DropdownSelection from './teamInvite';
import { removeTeamUser } from '../../../apollo-graphql/teamOrgQueries.js'
import {teamsByOwner} from "../../../apollo-graphql/userQueries";
import { Mutation } from "react-apollo";
import {
    UserWrapper,
    ImageWrapper,
    CardRight,
    NewUserCardName,
    DeleteUserIcon
} from '../../../layout/AdminComponents.js'

class ProjUserDD extends Component {
    render(){
        const {
            teamId,
            variables,
            teamsToRemove
        } = this.props;

        return (
            <Mutation mutation={removeTeamUser}>
                {(removeTeamUser, { data, loading }) => {
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
                                teamId={teamId}
                                teamsByOwner={teamsByOwner}
                                variables={variables}
                            />
                            {(this.props.teamData || []).map(team => {
                                if (team._id === this.props.team._id) {
                                    return (
                                        (team.users).map((user, i) => (
                                            <UserWrapper image key={i}>
                                                <ImageWrapper src='http://i.pravatar.cc/300' />
                                                <NewUserCardName>{user.username}</NewUserCardName>
                                                <DeleteUserIcon>
                                                        <Icon
                                                            size='large'
                                                            name='delete'
                                                            className='delete'
                                                            onClick={async e => {
                                                                e.preventDefault();
                                                                if(loading){
                                                                }
                                                                await removeTeamUser({
                                                                    variables: { _id: teamId, user: user._id, projectId: teamsToRemove },
                                                                    refetchQueries: [{ query: teamsByOwner, variables: variables }]
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

export default ProjUserDD;
