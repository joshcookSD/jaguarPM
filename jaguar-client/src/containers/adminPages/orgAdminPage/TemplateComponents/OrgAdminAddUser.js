import React, { Component } from 'react';
import {  Dimmer, Loader } from 'semantic-ui-react';
import DropdownSelection from './OrgInvite.js';
import { removeOrgUser } from '../../../apollo-graphql/teamOrgQueries.js'
import { getOrgByOwner } from '../../../apollo-graphql/userQueries'
import { Mutation } from "react-apollo";
import {UserWrapper, ImageWrapper, CardRight, NewUserCardName, DeleteUserIcon} from '../../../layout/AdminComponents.js'

class OrgAddUserCard extends Component {
    state = {
        hovering: false,
        index: ''
    };

    onEnter = (i) => this.setState({ hovering: true, index: i });
    onExit = () => this.setState({ hovering: false, index:'' });

    render(){
        const {
            orgId,
            variables,
            teamsToRemove,
            orgData
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
                            handleAfterSubmit={this.props.handleAfterSubmit}
                            orgId={orgId}
                            variables={variables}
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
                                                {/*<Icon*/}
                                                    {/*onMouseEnter={(() => this.onEnter(i))}*/}
                                                    {/*onMouseLeave={this.onExit}*/}
                                                    {/*size={this.state.hovering && this.state.index === i  ? 'big' : 'large'}*/}
                                                    {/*name='delete'*/}
                                                    {/*color={this.state.hovering && this.state.index === i  ? 'red' : 'black'}*/}
                                                    {/*onClick={async e => {*/}
                                                        {/*e.preventDefault();*/}
                                                        {/*await removeOrgUser({*/}
                                                            {/*variables: {_id: orgId, user: user._id, teamId: teamsToRemove},*/}
                                                            {/*update: async (store, { data: newTeam }) => {*/}
                                                                {/*const data = store.readQuery({query: getOrgByOwner, variables: variables });*/}
                                                                {/*let currentOrg = data.getOrgByOwner.find(org => org._id === orgId);*/}
                                                                {/*let newTeamForCache = newTeam.createTeam;*/}
                                                                {/*await currentOrg.teams.push(newTeamForCache);*/}
                                                                {/*await store.writeQuery({*/}
                                                                    {/*query: getOrgByOwner,*/}
                                                                    {/*variables: variables,*/}
                                                                    {/*data: data*/}
                                                                {/*});*/}
                                                            {/*}*/}
                                                        {/*});*/}
                                                    {/*}}*/}
                                                {/*/>*/}
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
