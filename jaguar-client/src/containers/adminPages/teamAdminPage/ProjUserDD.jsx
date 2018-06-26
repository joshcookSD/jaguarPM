import React, { Component } from 'react';
import {  Icon } from 'semantic-ui-react';
import DropdownSelection from './teamInvite';
import { removeTeamUser } from '../../apollo-graphql/teamOrgQueries.js'
import { Mutation } from "react-apollo";
import {
    UserWrapper,
    ImageWrapper,
    CardRight,
    NewUserCardName,
    DeleteUserIcon,
} from '../../layout/AdminComponents.js'



class ProjUserDD extends Component {
    render(){
        const {
            team,
            teamId,
            teamsByOwner,
            variables,
            projectsToRemove
        } = this.props;

        return (
            <Mutation mutation={removeTeamUser}>
                {(removeTeamUser, { data, loading }) => (
                    <CardRight>
                        <DropdownSelection
                            teamId={teamId}
                            teamsByOwner={teamsByOwner}
                            variables={variables}
                        />
                        {team.users.map((user, i) => (
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
                                                    console.log('loading')
                                                }
                                                await removeTeamUser({
                                                    variables: { _id: teamId, user: user._id, projectId: projectsToRemove },
                                                    refetchQueries: [{ query: teamsByOwner, variables: variables }]
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

export default ProjUserDD;
