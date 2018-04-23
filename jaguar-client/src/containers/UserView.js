import React, {Component} from 'react';
import TaskToday from './taskview/TaskToday'
import TaskDay from './taskview/TaskDay'
import TaskUnplanned from './taskview/TaskUnplanned'
import TaskTeam from './taskview/TaskTeam'
import moment from 'moment';
import AppLayout from './layout/AppLayout'
import NavSidebar from './layout/NavSidebar'
import MainSidebar from './layout/MainSidebar'
import Header from './layout/Header'
import ContentArea from './layout/ContentArea'
import {Section} from './layout/Section'

class UserView extends Component {

    render() {
        const tomorrow = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        const plus2 = moment(Date.now()).add(2,'day').format('YYYY-MM-DD');
        const plus3 = moment(Date.now()).add(3,'day').format('YYYY-MM-DD');
        const plus4 = moment(Date.now()).add(4,'day').format('YYYY-MM-DD');
        const plus5 = moment(Date.now()).add(5,'day').format('YYYY-MM-DD');
        return(
            <AppLayout>
                <NavSidebar/>
                <MainSidebar><TaskToday /></MainSidebar>
                <Header/>
                <ContentArea>
                <Section><TaskDay day={tomorrow}/></Section>
                <Section><TaskDay day={plus2}/></Section>
                <Section><TaskDay day={plus3}/></Section>
                <Section><TaskDay day={plus4}/></Section>
                <Section><TaskDay day={plus5}/></Section>
                <Section><TaskUnplanned/></Section>
                <Section><TaskTeam/></Section>
                </ContentArea>
            </AppLayout>
        )
    }
}



export default UserView;

