import React, {Component} from 'react';
import TaskToday from '../taskview/TaskToday'
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import Header from '../layout/Header'
import ContentArea from '../layout/ContentArea'
import decode from 'jwt-decode';
import { Segment} from 'semantic-ui-react';
const token = localStorage.getItem('token');


const { user } = decode(token);

class UserView extends Component {

    render() {

        return(
            <AppLayout>
                <NavSidebar/>
                <MainSidebar><TaskToday /></MainSidebar>
                <Header/>
                    <Segment>
                    <div>
                        Organization Name:{}
                       </div>
                    <div>
                        Organization Description:
                       </div>
                    <div>
                        Organization Admin:
                       </div>
                       <div>i ate git</div>
                    </Segment>
            </AppLayout>
        )
    }
}



export default UserView;
