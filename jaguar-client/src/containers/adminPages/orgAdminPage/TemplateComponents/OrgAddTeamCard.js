import React from 'react';
import TeamForm from '../../teamAdminPage/TeamAdminComponents/TeamForm';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { TeamCardWrapper, CardLeftWrapper } from '../../../layout/AdminComponents.js'
import styled from 'styled-components';

const TeamCardListWarapper = styled.div`
    margin-top: 10px;
`;

const AddTeamCard = (props) => {
    function handleAfterSubmit(org){
        props.handleAfterSubmit(org);
    }

    return (
        <CardLeftWrapper>
            <TeamForm
                className="teamForm"
                handleAfterSubmit={handleAfterSubmit}
                activeView={props.org}
                orgId={props.org._id}
                variables={props.variables}
            />
            {(props.orgData || []).map(org => {
                if (org._id === props.org._id) {
                    return (
                        (org.teams).map((team, i) => (
                            <Link to='/team-admin' key={i}>
                                <TeamCardListWarapper>
                                    <Card>
                                        <Card.Content>
                                            <TeamCardWrapper>
                                                <Icon name='group'/>
                                                <Card.Header>{team.teamtitle}</Card.Header>
                                            </TeamCardWrapper>
                                        </Card.Content>
                                    </Card>
                                </TeamCardListWarapper>
                            </Link>
                        ))
                    )
                }
            })}
        </CardLeftWrapper>
    );
};

export default AddTeamCard;
