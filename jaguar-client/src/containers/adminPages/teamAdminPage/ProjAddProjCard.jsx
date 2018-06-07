import React from 'react';
import { Card } from 'semantic-ui-react';
import ProjectForm from '../../proj_group/projectcomponents/ProjectForm';
import { Link } from 'react-router-dom';

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
                <Link to='/project-admin' key={i}>
                    <Card>
                        <Card.Content>
                            <Card.Header>{team.projecttitle}</Card.Header>
                            <Card.Description>{team.projectdescription}</Card.Description>
                        </Card.Content>
                    </Card>
                </Link>
            ))}
    </CardLeft>


);
export default ProjAddProjCard;
