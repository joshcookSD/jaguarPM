import React from 'react';
import { Query } from "react-apollo";
import { Image, Tab } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { teamsByOwner } from "../../../apollo-graphql/userQueries";
import Logo from '../../../../images/jaguarwhite.png';
import ProjTabHeader from './ProjTabHeader';
import ProjAddProjCard from './ProjAddProjCard';
import ProjUserDD from './ProjAdminAddUser.js';
import { HeaderWrapper } from '../../../layout/AdminComponents.js'
import '../../orgAdminPage/TemplateComponents/OrgAdminHeader.css';

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

const variables = { owner: userId };

const TeamAdminHeader = ({ owner }) => (
    <Query query={teamsByOwner} variables={variables}>
        {({ loading, error, data }) => {
            const dataPane = (data.teamsByOwner || []).map(team => (
                {
                    menuItem: team.teamtitle, render: () =>
                        <Tab.Pane className="orgTab" attached={false} >
                            <div className="tabHeader">
                                <ProjTabHeader
                                    teamTitle={team.teamtitle}
                                    teamdescription={team.teamdescription}
                                    defaultproject={team.defaultproject ? team.defaultproject.projecttitle : ''}
                                />
                            </div>
                                <ProjAddProjCard
                                    teamsByOwner={teamsByOwner}
                                    teamId={team._id}
                                    variables={variables}
                                    teams={team}
                                />
                          
                                <ProjUserDD
                                    team={team}
                                    teamId={team._id}
                                    teamsByOwner={teamsByOwner}
                                    variables={variables}
                                    projectsToRemove={team.projects.map((project, i) => project._id).toString()}

                                />
                        </Tab.Pane>
                }
            ))
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return (
                <HeaderWrapper>
                    <Image verticalAlign='middle' floated='right'
                        size='mini'
                        src={Logo}
                    />
                    <Tab menu={{ secondary: true }} panes={dataPane} />
                </HeaderWrapper>
            )
        }}
    </Query>
);

export default TeamAdminHeader;
