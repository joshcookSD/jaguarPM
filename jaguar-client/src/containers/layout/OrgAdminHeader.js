import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import Logo from '../../images/jaguarwhite.png';
import { Tab } from 'semantic-ui-react'
import './OrgAdminHeader.css';
import TeamForm from '../org_team/TeamForm';
import { Section } from '../layout/Section'
import decode from 'jwt-decode';
import { Segment, Card } from 'semantic-ui-react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Query } from "react-apollo";
import { getOrgByOwner } from "../apollo-graphql/userQueries";
import ContentArea from '../layout/ContentArea';
import TopRowContent from '../layout/TopRowContent';


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
                { menuItem: org.orgtitle, render: () => 
                    <Tab.Pane attached={false}>
                        <h2 className="orgTitle">OT: {org.orgtitle}</h2>
                        <h2 className="orgTitle">OD: {org.orgdescription}</h2>
                        <TeamForm orgId={org._id} />
                    </Tab.Pane> }
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
