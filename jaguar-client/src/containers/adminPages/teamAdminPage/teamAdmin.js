import React from 'react';
import TaskToday from '../../taskview/TaskToday'
import AppLayout from '../../layout/AppLayout'
import NavSidebar from '../../layout/NavSidebar'
import MainSidebar from '../../layout/MainSidebar'
import TeamAdminHeader from './TeamAdminHeader'

const TeamAdmin = () => {
            return (
                <AppLayout>
                    <NavSidebar />
                    <MainSidebar>
                        <TaskToday />
                    </MainSidebar>
                    <TeamAdminHeader />
                </AppLayout>
            )
        };

export default TeamAdmin;




