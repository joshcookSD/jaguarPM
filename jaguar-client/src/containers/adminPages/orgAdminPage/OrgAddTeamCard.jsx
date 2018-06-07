import React from 'react';
import TeamForm from '../teamAdminPage/TeamForm';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const AddTeamCard = (props) => (
        <div className="cardLeft">
            <TeamForm className="teamForm" orgId={props.org._id} />
                <h3 className="orgTeamTitle">Team Info</h3>
                {props.org.teams.map((team, i) => (
                    <Link to='/team-admin'  key={i}>
                        <Card>
                            <Card.Content>
                                <Card.Meta>Team</Card.Meta>
                                <Card.Header>{team.teamtitle}</Card.Header>
                            </Card.Content>
                        </Card>
                    </Link>
                ))}
        </div>
);

export default AddTeamCard;
