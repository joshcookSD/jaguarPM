import React from 'react';
import { Card } from 'semantic-ui-react';
import ProjectForm from '../../proj_group/projectcomponents/ProjectForm';

const ProjAddProjCard = (props) => (

    <div className="cardLeft">
        <ProjectForm className="teamForm" teamsByOwner={props.teamsByOwner} team={props.teamId} variables={props.variables} />
        <h3 className="orgTeamTitle">Team Info</h3>
            {props.teams.projects.map(team => (
                <Card>
                    <Card.Content>
                        <Card.Meta>Title</Card.Meta>
                        <Card.Header>{team.projecttitle}</Card.Header>
                        <Card.Description>{team.projectdescription}</Card.Description>
                        {/* <Card.Meta>Description</Card.Meta> */}
                    </Card.Content>
                </Card>
            ))}
    </div>


);
export default ProjAddProjCard;
