import React from 'react';
import { Query } from "react-apollo";
import styled from 'styled-components';
import { Image, Tab } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { teamsByOwner } from "../../apollo-graphql/userQueries";


import Logo from '../../../images/jaguarwhite.png';
import ProjTabHeader from './ProjTabHeader';
import ProjAddProjCard from './ProjAddProjCard';
import ProjUserDD from './ProjUserDD';
import '../teamAdminPage/TeamAdminHeader.css';


const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
  grid-row: 1;
  background-color: black;
  color: white;
  padding-top: .4em;
  padding-right: 1em;
`;

const variables = { owner: userId };

const TeamAdminHeader = ({ owner }) => (

    <Query query={teamsByOwner} variables={variables}>
        {({ loading, error, data }) => {
            console.log(data);
            const dataPane = data.teamsByOwner.map(team => (     
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
                            <div className="addTeamCard">
                                <ProjAddProjCard
                                    teamsByOwner={teamsByOwner}
                                    teamId={team._id}
                                    variables={variables}
                                    teams={team}
                                />
                            </div>
                            <div className="addUserCard">
                                <ProjUserDD
                                    teamId={team._id}
                                    teamsByOwner={teamsByOwner}
                                    variables={variables}
                                    team={team}
                                />
                            </div>
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