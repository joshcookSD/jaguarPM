import React from 'react';
import TeamForm from '../teamAdminPage/TeamForm';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const TeamCardWrapper = styled.div`
    display: grid;
    grid-template-columns: 25% 75%;
`;

const CardLeftWrapper = styled.div`
    grid-column-start: 2;
    grid-row-start: 2;
    grid-row-end: 4;
`;



const AddTeamCard = (props) => (
    <CardLeftWrapper>
            <TeamForm className="teamForm" orgId={props.org._id} />
                {props.org.teams.map((team, i) => (
                    <Link to='/team-admin'  key={i}>
                        <Card>
                            <Card.Content>
                                <TeamCardWrapper>
                                    <Icon name='group' />
                                    <Card.Header>{team.teamtitle}</Card.Header>
                                </TeamCardWrapper> 
                            </Card.Content>
                        </Card>
                    </Link>
                ))}
    </CardLeftWrapper>
);

export default AddTeamCard;
