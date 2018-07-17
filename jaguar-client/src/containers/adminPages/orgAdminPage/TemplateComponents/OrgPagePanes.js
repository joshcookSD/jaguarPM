import React, {Component} from 'react';
import TabHeader from './OrgAdminTabHeader.js';
import AddTeamCard from './OrgAddTeamCard.js';
import OrgAddUserCard from './OrgAdminAddUser.js';
import './OrgPagePanes.css'
import styled from 'styled-components';
import {
    AdminPagePaneWrapper,
} from '../../../layout/AdminComponents.js'

const PaneHeaderWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 1;
`;

const AddTeamWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 2;
    grid-row-end: 2;
    padding: 10px;
`;

const OrgAddUserCardWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 3;
    grid-row-end: 3;
    padding: 10px;
`;

const PaneGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-template-rows: 1fr 3fr;
`;


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
    const {activeView, variables, org} = this.props;
        return (
            <AdminPagePaneWrapper>
                <PaneHeaderWrapper>
                    <TabHeader
                        orgTitle={activeView.orgtitle}
                        orgDescription={activeView.orgdescription}
                    />
                </PaneHeaderWrapper>

                <AddTeamWrapper>
                    <AddTeamCard
                        handleAfterSubmit={this.handleAfterSubmit}
                        org={activeView}
                        orgData={org}
                        variables={variables}
                    />
                </AddTeamWrapper>

                <OrgAddUserCardWrapper>
                    <OrgAddUserCard
                        org={activeView}
                        orgData={org}
                        orgId={activeView._id}
                        variables={variables}
                        teamsToRemove={(activeView.teams || []).map((team, i) => team._id).toString()}
                    />
                </OrgAddUserCardWrapper>

            </AdminPagePaneWrapper>
        );
    }
}

export default OrgPagePanes;