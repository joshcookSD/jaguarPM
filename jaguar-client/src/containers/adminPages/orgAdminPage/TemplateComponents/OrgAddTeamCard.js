import React, {Component} from 'react';

import { Icon, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {getOrgByOwner, teamsByOwner, teamsByUser} from "../../../apollo-graphql/userQueries";
import { removeTeamFromOrg } from "../../../apollo-graphql/teamOrgQueries";
import { Mutation } from "react-apollo";

import {
    OrgPageTeamCardWrapper,
    NewUserCardName,
    DeleteUserIcon,
    AddCardWrapper
} from '../../../layout/AdminComponents.js'
import decode from 'jwt-decode';
import {userProjectGroups, userTeamProjects} from "../../../apollo-graphql/groupProjectQueries";
const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;


    class AddTeamCard extends Component {
        state = {
            hovering: false,
            index: ''
        };

        onEnter = (i) => this.setState({ hovering: true, index: i });
        onExit = () => this.setState({ hovering: false, index:'' });

        render(){
            return (
                <Mutation mutation={removeTeamFromOrg}>
                    {(removeTeamFromOrg, { data, loading }) => {
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader/>
                                </Dimmer>
                            </div>
                        );
                        return (
                            <AddCardWrapper>
                                {(this.props.orgData || []).map(org => {
                                    const teamCheck = org.teams
                                    if (org._id === this.props.org._id) {
                                        return (
                                            (org.teams).map((team, i) => (
                                                <Link to='/team-admin' key={i}>
                                                    <OrgPageTeamCardWrapper image key={i}>
                                                        <Icon name='group' style={{'align-self': 'center'}}/>
                                                        <NewUserCardName>{team.teamtitle}</NewUserCardName>
                                                        <DeleteUserIcon>
                                                            {/*<Icon*/}
                                                                {/*onMouseEnter={(() => this.onEnter(i))}*/}
                                                                {/*onMouseLeave={this.onExit}*/}
                                                                {/*size={this.state.hovering && this.state.index === i  ? 'big' : 'large'}*/}
                                                                {/*color={this.state.hovering && this.state.index === i  ? 'red' : 'black'}*/}
                                                                {/*name='delete'*/}
                                                                {/*onClick={async e => {*/}
                                                                    {/*console.log('clicked')*/}
                                                                    {/*e.preventDefault();*/}
                                                                    {/*// if (teamCheck.length === 1) {*/}
                                                                    {/*//     alert('must have one team in the Organization')*/}
                                                                    {/*// } else {*/}
                                                                        {/*await removeTeamFromOrg({*/}
                                                                            {/*variables: {*/}
                                                                                {/*teamToDeleteId: team._id,*/}
                                                                                {/*teamOrgId: team.organization._id,*/}
                                                                                {/*teamOwnerId: this.props.variables.owner,*/}
                                                                                {/*teamProjects: team.projects.map((project) => project._id).toString(),*/}
                                                                                {/*teamUsers: team.users.map((user) => user._id).toString(),*/}
                                                                                {/*teamGroupsTasks: team.groups.map((group) => group.tasks.map((task) => task._id)).join(''),*/}
                                                                                {/*teamGroups: team.groups.map((group) => group._id).toString()*/}
                                                                            {/*},*/}
                                                                            {/*refetchQueries: [*/}
                                                                                {/*{query: getOrgByOwner, variables: this.props.variables},*/}
                                                                                {/*{query: teamsByOwner, variables: this.props.variables},*/}
                                                                                {/*{query: teamsByUser, variables: { user: userId }},*/}
                                                                                {/*{query: userTeamProjects, variables: { _id: userId }},*/}
                                                                                {/*{query: userProjectGroups, variables: { _id: userId }},*/}

                                                                            {/*]*/}
                                                                        {/*});*/}
                                                                    {/*// }*/}
                                                                {/*}}*/}
                                                            {/*/>*/}
                                                        </DeleteUserIcon>
                                                    </OrgPageTeamCardWrapper>
                                                </Link>
                                            ))
                                        )
                                    }
                                })}
                            </AddCardWrapper>
                        )
                    }}
                </Mutation>
            );
        }

    };

export default AddTeamCard;