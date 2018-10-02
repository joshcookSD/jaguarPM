import React, {Component} from 'react';
import TabHeader from './OrgAdminTabHeader.js';
import AddTeamCard from './OrgAddTeamCard.js';
import OrgAddUserCard from './OrgAdminAddUser.js';
import TeamForm from './TeamForm';
import { Header } from 'semantic-ui-react';
import './OrgPagePanes.css'
import {
    AdminPagePaneWrapper,
    AddTeamWrapper
} from '../../../layout/AdminComponents.js'

class OrgPagePanes extends Component {
    state = {
        teamAdded: true,
    };

    componentWillReceiveProps(nextProps){
        if(this.props.activeView.teams !== nextProps.activeView.teams){
            this.setState({
                teamAdded: !this.teamAdded,
            });
        }
    }

    handleAfterSubmit = (org, selected) => {
        this.props.handleAfterSubmit(org, selected)
    };

    render () {
        const {activeView, variables, data} = this.props;
        return (
            <AdminPagePaneWrapper>
                <TabHeader
                    orgTitle={activeView.orgtitle}
                    orgDescription={activeView.orgdescription}
                />
                <TeamForm
                    className="teamForm"
                    handleAfterSubmit={this.handleAfterSubmit}
                    activeView={activeView}
                    orgId={activeView._id}
                    variables={variables}
                />
                <OrgAddUserCard
                    handleAfterSubmit={this.handleAfterSubmit}
                    org={activeView}
                    orgData={data}
                    orgId={activeView._id}
                    variables={variables}
                    teamsToRemove={(activeView.teams || []).map((team, i) => team._id).toString()}
                />
                <AddTeamWrapper>
                    <div>
                        <Header as='h2' icon>
                            Teams
                        </Header>
                    </div>
                    <AddTeamCard
                        handleAfterSubmit={this.handleAfterSubmit}
                        org={activeView}
                        orgData={data}
                        variables={variables}
                    />
                </AddTeamWrapper>
            </AdminPagePaneWrapper>
        );
    }
}

export default OrgPagePanes;