import React, { Component } from 'react';
import {  Icon } from 'semantic-ui-react';
import DropdownSelection from './OrgInvite.jsx';
import styled from 'styled-components';
import { removeOrgUser } from '../../apollo-graphql/teamOrgQueries.js'
import { Mutation } from "react-apollo";



const UserWrapper = styled.div`
    margin-top: 5px;
    color: black
    border-width: 1px;
    border radius: 0 0 !important
    width: 90%;
    height: 42px;
    display:grid
    grid-template-columns: 25% 60% 15%;
`;

const ImageWrapper = styled.img`
    height: 40px
    width: 40px
    border-radius: .28571429rem;
`;

const CardRight = styled.div`
    height: 100%;
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;

    grid-column-start: 3;
    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 10px;
    
    grid-row-start: 2;
    grid-row-end: 4;
        
`;

const NewUserCardName = styled.span`
    
    align-self: center;
`;

const DeleteUserIcon = styled.span`
    justify-self: center;
    align-self: center;
`;


class OrgAddUserCard extends Component {
    
    deleteUser(userId){
        console.log(userId)
        console.log(this.props.orgId)
        removeOrgUser({ variables: { _id: this.props.orgId, user: userId } });
    }

    render(){

        const {
            orgId,
            getOrgByOwner,
            variables 
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
                    {this.props.org.users.map((user, i) => (
                        <UserWrapper image key={i}>
                        {console.log(user)}
                            <ImageWrapper src='http://i.pravatar.cc/300' />
                            <NewUserCardName>{user.username}</NewUserCardName>
                            <DeleteUserIcon>
                                <Icon
                                    size='large'
                                    name='delete'
                                    onClick={async e => {
                                        e.preventDefault();
                                        await removeOrgUser({
                                            variables: { _id: orgId, user: user._id },
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
