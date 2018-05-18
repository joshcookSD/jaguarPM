import React from 'react';
import { Card } from 'semantic-ui-react';
import AddGroupForm from './AddGroupForm';

const AddGroupToProj = (props) => (

    <div className="cardLeft">
        <AddGroupForm className="AddGroupForm" teamsByOwner={props.teamsByOwner} team={props.teamId} variables={props.variables} />
        <h3 className="orgTeamTitle">Team Info</h3>
        {/*{props.teams.projects.map(team => (*/}
            <Card>
                <Card.Content>
                    <Card.Meta>Title</Card.Meta>
                    {/*<Card.Header>{team.projecttitle}</Card.Header>*/}
                    <Card.Header>group header</Card.Header>
                    {/*<Card.Description>{team.projectdescription}</Card.Description>*/}
                    <Card.Description>group description</Card.Description>
                </Card.Content>
            </Card>
        {/*))}*/}
    </div>
);
export default AddGroupToProj;