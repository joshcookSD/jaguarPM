import React from 'react';
import { Query } from "react-apollo";
import styled from 'styled-components';
import { Image, Tab} from 'semantic-ui-react';
import decode from 'jwt-decode';
import { getOrgByOwner } from "../apollo-graphql/userQueries";
import TeamForm from '../org_team/TeamForm';
import DropdownExampleSelection from '../org_team/orgInvite';
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

const OrgAdminHeader = ({ owner }) => (
    <Query query={getOrgByOwner} variables={{ owner: userId }}>
        {({ loading, error, data }) => {
            const dataPane = data.orgByOwner.map(org => (
                {
                menuItem: org.orgtitle, render: () =>
                    <Tab.Pane className="orgTab" attached={false} >
                            <div className="orgHeader">
                                    <h2 className="orgTitle">OT: {org.orgtitle}</h2>
                                    <h2 className="orgTitle">OD: {org.orgdescription}</h2>
                            </div> 
                            <div className="formTeamDiv">
                                <div className="teamFormTeamInfo">
                                    <TeamForm orgId={org._id} />                            
                                    <div className="teamInfo">
                                        <h3>Team Info</h3>
                                        {  org.teams.map(team => (
                                        <ul>
                                        <li> Team title: {team.teamtitle}</li>
                                            <li>Teamdescription: {team.teamdescription}</li>
                                            </ul>
                                            ))}
                                    </div>
                                </div>
                                <div className="userDropDownOrgList">
                                <DropdownExampleSelection />
                                        <div className="currentUserOrgList"> 
                                            <h3>Org Users</h3>  
                                            {org.users.map(user => (
                                                    <ul className="orgUsers">
                                                    <li>{user.username}</li>
                                                    </ul>
                                            ))}
                                        </div>
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
