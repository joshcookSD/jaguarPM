import React from 'react';
import TeamForm from '../teamAdminPage/TeamForm';
import { Card } from 'semantic-ui-react';

const AddTeamCard = (props) => (
        <div className="cardLeft">
            <TeamForm className="teamForm" orgId={props.org._id} />
                <h3 className="orgTeamTitle">Team Info</h3>
                {props.org.teams.map(team => (
                    // <Card>
                    //     <Card.Content>
                    //         <Card.Header>{team.teamtitle}</Card.Header>
                    //         <Card.Meta>Title</Card.Meta>
                    //         <Card.Description>{team.teamdescription}</Card.Description>
                    //         {/* <Card.Meta>Description</Card.Meta> */}
                    //     </Card.Content>
                    // </Card>
                    <div>
                        <div className="teamTitleHeader">Team Title: <br /> {team.teamtitle}</div>
                        <div className="teamTitleHeader">Team Description: <br /> {team.teamdescription} </div>
                    </div>
                   

                ))}
        </div>
);

export default AddTeamCard;
