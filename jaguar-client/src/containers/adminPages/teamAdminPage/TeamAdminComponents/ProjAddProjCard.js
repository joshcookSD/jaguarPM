import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import ProjectForm from '../../../proj_group/projectcomponents/ProjectForm';
import { Link } from 'react-router-dom';
import { TeamCardWrapper, CardLeftWrapper } from '../../../layout/AdminComponents.js'

const ProjAddProjCard = (props) => {
    function handleAfterSubmit(team){
        props.handleAfterSubmit(team);
    }
    console.log(props.teamData)

    return (
        <CardLeftWrapper>
            <ProjectForm
                className="teamForm"
                handleAfterSubmit={handleAfterSubmit}
                activeView={props.team}
                teamId={props.team._id}
                variables={props.variables}
            />
            {(props.teamData || []).forEach((team, i) => {
                if (team._id === props.team._id) {
                    return (
                        (team.projects || []).forEach((project, i) => (
                            <Link to='/project-admin' key={i}>
                                <Card>
                                    <Card.Content>
                                        <TeamCardWrapper>
                                            <Icon name='group' />
                                            <Card.Header>{project.projecttitle}</Card.Header>
                                        </TeamCardWrapper>
                                    </Card.Content>
                                </Card>
                            </Link>
                        ))
                    )
                }
            })}
    </CardLeftWrapper>
    );
};

export default ProjAddProjCard;
