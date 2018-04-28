import React from 'react';
import { Query } from "react-apollo";
import styled from 'styled-components';
import { Image, Tab, Header, Card, List } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { teamsByOwner } from "../apollo-graphql/userQueries";
import ProjectForm from '../proj_group/projectcomponents/ProjectForm';
import DropdownSelection from '../org_team/teamInvite';
import Logo from '../../images/jaguarwhite.png';
import './OrgAdminHeader.css';

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
  grid-row: 1;
  background-color: black;
  color: white;
  padding-top: .4em;
  padding-right: 1em;
`;

const variables = { owner: userId };

const TeamAdminHeader = ({ owner }) => (

    <Query query={teamsByOwner} variables={variables}>
        {({ loading, error, data }) => {
            const dataPane = data.teamsByOwner.map(team => (
                {
                    menuItem: team.teamtitle, render: () =>
                        <Tab.Pane className="orgTab" attached={false} >
                            <div className="orgHeader">
                                <div><span className="headerTitle " >Title: </span>
                                    <span className="headerName">{team.teamtitle}</span></div>
                                <div className="orgDescrip"><span className="headerTitle" >Description: </span>
                                    <span className="headerName">{team.teamdescription}</span></div>           
                            </div>

                            <div className="formTeamDiv">
                                <div className="teamFormTeamInfo">
                                    <Card className="cardLeft">
                                                   
                                        <ProjectForm className="teamForm" teamsByOwner={teamsByOwner} team={team._id} variables={variables} />
                                        <div className="teamInfo">
                                            {/* <h3 className="orgTeamTitle">Team Info</h3> */}
                                            {team.projects.map(team => (
                                                <ul>
                                                    {/* <li> Team title: {team.projecttitle}</li>
                                                    <li>Teamdescription: {team.projectdescription}</li> */}
                                                    <li>
                                                    <List>
                                                        <List.Item>
                                                                
                                                            <List.Content>
                                                                    <List.Header as='a'><List.Icon name='cubes' />{team.projecttitle}</List.Header>
                                                                    <List.Description>{team.projectdescription}</List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                    </List>
                                                    </li>    
                                                </ul>
                                            ))}
                                        </div>
                                    </Card>
                                </div>

                            <div className="userDropDownOrgList">
                                <Card className="cardRight">
                                    <div className="currentUserOrgList">
                                        <h3 className="orgCardTitle">Add User To Project</h3>
                                        <DropdownSelection teamId={team._id} teamsByOwner={teamsByOwner} variables={variables} />
                                        {team.users.map(user => (
                                            <ul className="orgUsers">                                 
                                            <li className=" projectList">{
                                                <List>
                                                    <List.Item>
                                                        <List.Content>
                                                                <List.Header as='a'><List.Icon name='user' />{user.username}</List.Header>
                                                            {/* <List.Description>{team.projectdescription}</List.Description> */}
                                                        </List.Content>
                                                    </List.Item>
                                                </List>
                                            }
                                            </li>
                                            </ul>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                            </div>
                        </Tab.Pane>
                }
            ))
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return (
                <HeaderWrapper>
                    <Image verticalAlign='middle' floated='right'
                        size='mini'
                        src={Logo}
                    />
                    <Tab menu={{ secondary: true }} panes={dataPane} />
                </HeaderWrapper>
            )
        }}
    </Query>
);

export default TeamAdminHeader;

