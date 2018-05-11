import React from 'react';
import TeamForm from '../teamAdminPage/TeamForm';
import { Card } from 'semantic-ui-react';

const AddTeamCard = (props) => (
        <div className="cardLeft">
            <TeamForm className="teamForm" orgId={props.org._id} />
                <h3 className="orgTeamTitle">Team Info</h3>
                {props.org.teams.map(team => (
                    <Card>
                        <Card.Content>
                            <Card.Meta>Title</Card.Meta>
                            <Card.Header>{team.teamtitle}</Card.Header>
                            <Card.Description>{team.teamdescription}</Card.Description>
                            {/* <Card.Meta>Description</Card.Meta> */}
                        </Card.Content>
                    </Card>

                ))}
        </div>
);

export default AddTeamCard;
