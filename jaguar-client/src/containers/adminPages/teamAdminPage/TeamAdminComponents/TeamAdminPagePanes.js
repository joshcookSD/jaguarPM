import React, {Component} from 'react';
import ProjTabHeader from "./ProjTabHeader";
import ProjAddProjCard from "./ProjAddProjCard";
import ProjUserDD from "./ProjAdminAddUser";
import {teamsByOwner} from "../../../apollo-graphql/userQueries";
import ProjectForm from '../../../team_page/ProjectForm';
import { Header } from 'semantic-ui-react';
import {
    AdminPagePaneWrapper,
    AddTeamWrapper,
} from '../../../layout/AdminComponents.js'

class TeamAdminPagePanes extends Component {
    state = {
        projectAdded: true,
    };

    componentWillReceiveProps(nextProps){
        if(this.props.activeView.projects !== nextProps.activeView.projects){
            this.setState({
                projectAdded: !this.projectAdded,
            });
        }
    }

    handleAfterSubmit = (team, selected) => {
        this.props.handleAfterSubmit(team, selected)
    };

    render () {
        const {
            activeView,
            variables,
            team
        } = this.props;

        return (
            <AdminPagePaneWrapper>
                <ProjTabHeader
                    teamTitle={activeView.teamtitle}
                    teamDescription={activeView.teamdescription}
                />
                <ProjectForm
                    className="projectForm"
                    handleAfterSubmit={this.handleAfterSubmit}
                    activeView={activeView}
                    teamId={activeView._id}
                    variables={variables}
                    teamsByOwner={teamsByOwner}
                />
                <ProjUserDD
                    team={activeView}
                    teamData={team}
                    teamId={activeView._id}
                    teamsByOwner={teamsByOwner}
                    variables={variables}
                    teamsToRemove={(activeView.projects || []).map((project, i) => project._id).toString()}
                    handleAfterSubmit={this.handleAfterSubmit}
                />
                <AddTeamWrapper>
                    <div>
                        <Header as='h2' icon>
                            Projects
                        </Header>
                    </div>
                    <ProjAddProjCard
                        handleAfterSubmit={this.handleAfterSubmit}
                        team={activeView}
                        teamData={team}
                        variables={variables}
                    />
                </AddTeamWrapper>
            </AdminPagePaneWrapper>
        );
    }
}

export default TeamAdminPagePanes;