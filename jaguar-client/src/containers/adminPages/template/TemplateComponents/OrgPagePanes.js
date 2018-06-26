import React, {Component} from 'react';
import TabHeader from '../../orgAdminPage/OrgAdminTabHeader.jsx';
import AddTeamCard from '../../orgAdminPage/OrgAddTeamCard.jsx';
import OrgAddUserCard from '../../orgAdminPage/OrgAdminAddUser.jsx';

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
            <div>
                <TabHeader
                    orgTitle={activeView.orgtitle}
                    orgDescription={activeView.orgdescription}
                />
                <AddTeamCard
                    handleAfterSubmit={this.handleAfterSubmit}
                    org={activeView}
                    orgData={org}
                    variables={variables}
                />
                <OrgAddUserCard
                    org={activeView}
                    orgId={activeView._id}
                    variables={variables}
                    teamsToRemove={(activeView.teams || []).map((team, i) => team._id).toString()}
                />
            </div>
        );
    }
}

export default OrgPagePanes;