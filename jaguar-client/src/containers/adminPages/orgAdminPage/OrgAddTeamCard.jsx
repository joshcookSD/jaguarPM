import React from 'react';
import TeamForm from '../teamAdminPage/TeamForm';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { TeamCardWrapper, CardLeftWrapper } from '../../layout/AdminComponents.js'

const AddTeamCard = (props) => {
    function handleAfterSubmit(org, selected){
        props.handleAfterSubmit(org, selected);
    }
    return (
        <CardLeftWrapper>

            <TeamForm
                className="teamForm"
                handleAfterSubmit={handleAfterSubmit}
                activeView={props.org}
                orgId={props.org._id}
                variables={props.variables}
                getOrgByOwner={props.getOrgByOwner}
            />

            {(props.orgData || []).map(org => {
                if (org._id === props.org._id) {
                    return (
                        (org.teams).map((team, i) => (
                            <Link to='/team-admin' key={i}>
                                <Card>
                                    <Card.Content>
                                        <TeamCardWrapper>
                                            <Icon name='group'/>
                                            <Card.Header>{team.teamtitle}</Card.Header>
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
}

export default AddTeamCard;
