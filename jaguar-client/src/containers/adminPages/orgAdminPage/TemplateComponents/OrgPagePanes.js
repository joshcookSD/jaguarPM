import React, {Component} from 'react';
import TabHeader from './OrgAdminTabHeader.js';
import AddTeamCard from './OrgAddTeamCard.js';
import OrgAddUserCard from './OrgAdminAddUser.js';
import './OrgPagePanes.css'
import styled from 'styled-components';

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
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 2;
    padding: 10px;
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
            <div className='paneGrid'>
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

            </div>
        );
    }
}

export default OrgPagePanes;