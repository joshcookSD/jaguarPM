import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import ProjectForm from '../../proj_group/projectcomponents/ProjectForm';
import { Link } from 'react-router-dom';
import { TeamCardWrapper, CardLeftWrapper } from '../../layout/AdminComponents.js'

const ProjAddProjCard = (props) => (
    <CardLeftWrapper>
        <ProjectForm
            className="teamForm"
            teamsByOwner={props.teamsByOwner}
            team={props.teamId}
            variables={props.variables}
        />
            {props.teams.projects.map((team, i) => (
                <Link to='/project-admin' key={i}>
                    <Card>
                        <Card.Content>
                            <TeamCardWrapper>
                                <Icon name='group' />
                                <Card.Header>{team.projecttitle}</Card.Header>
                            </TeamCardWrapper>
                        </Card.Content>
                    </Card>
                </Link>
            ))}
    </CardLeftWrapper>


);
export default ProjAddProjCard;
