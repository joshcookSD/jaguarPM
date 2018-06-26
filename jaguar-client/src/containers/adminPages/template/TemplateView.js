import React from 'react';
import TaskToday from '../../taskview/TaskToday'
import AppLayout from '../../layout/AppLayout'
import NavSidebar from '../../layout/NavSidebar'
import MainSidebar from '../../layout/MainSidebar'
import OrgPageMain from './TemplateComponents/OrgPageMain.js'


const TeamAdmin = () => {
    return (
        <AppLayout>
            <NavSidebar />
            <MainSidebar>
                <TaskToday />
            </MainSidebar>
                <OrgPageMain />
        </AppLayout>
    )
};

export default TeamAdmin;