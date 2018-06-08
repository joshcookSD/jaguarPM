import React from 'react';
import { Query } from "react-apollo";
import styled from 'styled-components';
import { Image, Tab } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { getOrgByOwner } from "../../apollo-graphql/userQueries";
import Logo from '../../../images/jaguarwhite.png';
import './OrgAdminHeader.css';
import TabHeader from './OrgAdminTabHeader.jsx';
import AddTeamCard from './OrgAddTeamCard.jsx';
import OrgAddUserCard from './OrgAdminAddUser.jsx';

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
                        <div className="tabHeader">
                            <TabHeader 
                                orgTitle={org.orgtitle} 
                                orgDescription={org.orgdescription} 
                            /> 
                        </div>
                            <AddTeamCard org={org} />                       
                            <OrgAddUserCard 
                                org={org} 
                                orgId={org._id} 
                                getOrgByOwner={getOrgByOwner} 
                                variables={variables} 
                            />
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
