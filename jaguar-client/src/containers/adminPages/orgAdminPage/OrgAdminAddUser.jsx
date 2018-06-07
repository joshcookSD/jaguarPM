import React from 'react';
import {  Card, Label, Icon } from 'semantic-ui-react';
import DropdownSelection from './OrgInvite.jsx';
import styled from 'styled-components';

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




const OrgAddUserCard = (props) => (
    <CardRight>
            <DropdownSelection
                orgId={props.orgId}
                getOrgByOwner={props.getOrgByOwner}
                variables={props.variables}
            />
            {props.org.users.map((user, i) => (
                        <UserWrapper image key={i}>
                            <ImageWrapper src='http://i.pravatar.cc/300' />
                            <NewUserCardName>{user.username}</NewUserCardName>
                            <DeleteUserIcon><Icon size='large' name='delete' /></DeleteUserIcon>
                        </UserWrapper>
            ))}
    </CardRight>
);

export default OrgAddUserCard;
