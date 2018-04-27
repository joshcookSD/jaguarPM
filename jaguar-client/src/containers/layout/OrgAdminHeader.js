import React from 'react';
import { Query } from "react-apollo";
import styled from 'styled-components';
import { Image, Tab, Header, Card} from 'semantic-ui-react';
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
                            <Header as='h3' block>
                                <h3 className="topOrgLabel">Organization Title:</h3> {org.orgtitle}<br />
                                <h3>Organization Description:</h3> {org.orgdescription}
                                </Header>
                            </div> 

                            <div className="formTeamDiv">
                                <div className="teamFormTeamInfo">
                                <Card className="cardLeft">
                                        <TeamForm className="teamForm" orgId={org._id} />                            
                                        <div className="teamInfo">
                                            <h3 className="orgTeamTitle">Team Info</h3>
                                            {  org.teams.map(team => (
                                                <ul>
                                                    <li> Team title {team.teamtitle}</li>
                                                    <li>Teamdescription {team.teamdescription}</li>
                                                </ul>
                                            ))}
                                        </div>
                                     </Card>
                                </div>

                                <div className="userDropDownOrgList">
                                <Card className="cardRight">
                                            <div className="currentUserOrgList"> 
                                                <h3 className="orgCardTitle">Org Users</h3>  
                                    <DropdownSelection orgId={org._id} getOrgByOwner={getOrgByOwner} variables={variables} />
                                                {org.users.map(user => (
                                                        <ul className="orgUsers">
                                                        <li>{user.username}</li>
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

export default OrgAdminHeader;
