import React, {Component} from 'react';
import ProjTabHeader from "./ProjTabHeader";
import ProjAddProjCard from "./ProjAddProjCard";
import ProjUserDD from "./ProjAdminAddUser";
import {teamsByOwner} from "../../../apollo-graphql/userQueries";

class TeamAdminPagePanes extends Component {
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
        const {
            activeView,
            variables,
            team
        } = this.props;

        return (
            <div>
                <ProjTabHeader
                    teamTitle={activeView.teamtitle}
                    teamDescription={activeView.teamdescription}
                />
                <ProjAddProjCard
                    handleAfterSubmit={this.handleAfterSubmit}
                    team={activeView}
                    teamData={team}
                    variables={variables}
                />
                <ProjUserDD
                    team={activeView}
                    teamData={team}
                    teamId={activeView._id}
                    teamsByOwner={teamsByOwner}
                    variables={variables}
                    teamsToRemove={(activeView.projects || []).map((project, i) => project._id).toString()}
                />
            </div>
        );
    }
}

export default TeamAdminPagePanes;