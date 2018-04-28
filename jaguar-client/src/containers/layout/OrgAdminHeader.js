import React from 'react';
import { Query } from "react-apollo";
import styled from 'styled-components';
import { Image, Tab, Header, Card, List, Label} from 'semantic-ui-react';
import decode from 'jwt-decode';
import { getOrgByOwner } from "../apollo-graphql/userQueries";
import TeamForm from '../org_team/TeamForm';
import DropdownSelection from '../org_team/orgInvite';
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

const OrgAdminHeader = ({ owner }) => (
    
    <Query query={getOrgByOwner} variables={variables}>
        {({ loading, error, data }) => {
            const dataPane = data.orgByOwner.map(org => (
                {
                menuItem: org.orgtitle, render: () =>
                    <Tab.Pane className="orgTab" attached={false} >
                            <div className="orgHeader">
                            <div><span className="headerTitle " >Organization Title: </span>
                                <span className="headerName">{org.orgtitle}</span></div>
                            <div className="orgDescrip"><span className="headerTitle" >Organization Description: </span>
                                <span className="headerName">{org.orgdescription}</span></div> 
                            </div> 
                            <div className="formTeamDiv">
                                <div className="teamFormTeamInfo">
                                <Card className="cardLeft">
                                        <TeamForm className="teamForm" orgId={org._id} />                            
                                        <div className="teamInfo">
                                            <h3 className="orgTeamTitle">Team Info</h3>
                                            {  org.teams.map(team => (
                                                // <ul>
                                                //     <li> <span>Team title</span><br></br> {team.teamtitle}</li>
                                                // <li><span>Teamdescription</span><br></br> {team.teamdescription}</li>
                                                // </ul>
                                            <Card>
                                                <Card.Content>
                                                    <Card.Header>{team.teamtitle}</Card.Header>
                                                    <Card.Meta>Title</Card.Meta>
                                                    <Card.Description>{team.teamdescription}</Card.Description>
                                                    {/* <Card.Meta>Description</Card.Meta> */}
                                                </Card.Content>
                                            </Card>

                                            // <List>
                                            //     <List.Item>
                                            //         <List.Content>
                                            //             <List.Header as='a'><List.Icon name='user' />{user.username}</List.Header>
                                            //             {/* <List.Description>{team.projectdescription}</List.Description> */}
                                            //         </List.Content>
                                            //     </List.Item>
                                            // </List>
                                            ))}
                                        </div>
                                     </Card>
                                </div>

                                <div className="userDropDownOrgList">
                                <Card className="cardRight">
                                            <div className="currentUserOrgList"> 
                                                <h3 className="orgCardTitle">Add User To Organization</h3>  
                                    <DropdownSelection orgId={org._id} getOrgByOwner={getOrgByOwner} variables={variables} />
                                                {org.users.map(user => (
                                                        // <ul className="orgUsers">
                                                        // <li>{user.username}</li>
                                                        // </ul>
                                            // <List>
                                            //     <List.Item>
                                            //         <List.Content>
                                            //             {/* <List.Header as='a'><List.Icon name='user' />{user.username}</List.Header> */}
                                            //             <Label as='a' image>
                                            //                 <List.Icon name='user' />
                                            //                 {/* <img src='/assets/images/avatar/small/joe.jpg' /> */}
                                            //                 {user.username}
                                            //                 </Label>
                                            //             {/* <List.Description>{team.projectdescription}</List.Description> */}
                                            //         </List.Content>
                                            //     </List.Item>
                                            // </List>

                                            <List>
                                                <List.Item>
                                                    <List.Content>
                                                        <List.Header as='a'><List.Icon name='user' />{user.username}</List.Header>
                                                        {/* <List.Description>{team.projectdescription}</List.Description> */}
                                                    </List.Content>
                                                </List.Item>
                                            </List>
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

export default OrgAdminHeader;
