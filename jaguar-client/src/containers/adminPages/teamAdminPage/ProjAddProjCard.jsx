import React from 'react';
import { Card } from 'semantic-ui-react';
import ProjectForm from '../../proj_group/projectcomponents/ProjectForm';

import styled from 'styled-components';

const CardLeft = styled.div`
        padding: 10px;
`;

const ProjAddProjCard = (props) => (

    <CardLeft >
        <ProjectForm
            className="teamForm"
            teamsByOwner={props.teamsByOwner}
            team={props.teamId}
            variables={props.variables}
        />
        <h3 className="orgTeamTitle">Team Info</h3>
            {props.teams.projects.map((team, i) => (
                <Card key={i}>
                    <Card.Content>
                        <Card.Header>{team.projecttitle}</Card.Header>
                        <Card.Description>{team.projectdescription}</Card.Description>
                    </Card.Content>
                </Card>
            ))}
    </CardLeft>


);
export default ProjAddProjCard;
