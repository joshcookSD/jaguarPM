import React from 'react';
import TaskToday from '../../taskview/TaskToday'
import AppLayout from '../../layout/AppLayout'
import NavSidebar from '../../layout/NavSidebar'
import MainSidebar from '../../layout/MainSidebar'
import OrgAdminHeader from './OrgAdminHeader.jsx'
import decode from 'jwt-decode';
import { Query } from "react-apollo";
import { getOrgByOwner } from "../../apollo-graphql/userQueries";

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
