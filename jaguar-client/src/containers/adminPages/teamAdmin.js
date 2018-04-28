import React from 'react';
import TaskToday from '../taskview/TaskToday'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import TeamAdminHeader from '../layout/TeamAdminHeader'
import decode from 'jwt-decode';
import { Query } from "react-apollo";
import { teamsByOwner } from "../apollo-graphql/userQueries";

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

const TeamAdmin = ({ owner }) => (
    <Query query={teamsByOwner } variables={{ owner: userId }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return (
                <AppLayout>
                    <NavSidebar />
                    <MainSidebar>
                        <TaskToday />
                    </MainSidebar>
                    <TeamAdminHeader />
                </AppLayout>
            )
        }}
    </Query>
);


export default TeamAdmin;




