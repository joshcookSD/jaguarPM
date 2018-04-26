import React, {Component} from 'react';
import TaskToday from '../taskview/TaskToday'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import OrgAdminHeader from '../layout/OrgAdminHeader'
import decode from 'jwt-decode';
import { Segment, Card} from 'semantic-ui-react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Query } from "react-apollo";
import { getOrgByOwner } from "../apollo-graphql/userQueries";
import TeamForm from '../org_team/TeamForm';
import ContentArea from '../layout/ContentArea';
import { Section } from '../layout/Section'
import TopRowContent from '../layout/TopRowContent';



const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

const OrgAdmin = ({ owner }) => (
    <Query query={getOrgByOwner} variables={{ owner: userId }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return (
            <AppLayout>
                <NavSidebar/>
                <MainSidebar>
                    <TaskToday />
                </MainSidebar>
                <OrgAdminHeader />
            </AppLayout>
            )
      }} 
    </Query>
);

export default OrgAdmin;
