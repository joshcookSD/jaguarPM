import React from 'react';
import TaskToday from '../taskview/TaskToday'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import TeamPageMain from './teampagecomponents/TeamPageMain'

const TeamAdmin = () => {
    return (
        <AppLayout>
            <NavSidebar />
            <MainSidebar>
                <TaskToday />
            </MainSidebar>
            <TeamPageMain />
        </AppLayout>
    )
};

export default TeamAdmin;