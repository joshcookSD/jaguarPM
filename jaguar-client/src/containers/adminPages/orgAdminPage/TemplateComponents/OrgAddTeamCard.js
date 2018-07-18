import React from 'react';
import TeamForm from '../../teamAdminPage/TeamAdminComponents/TeamForm';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CardLeftWrapper } from '../../../layout/AdminComponents.js'
import {getOrgByOwner} from "../../../apollo-graphql/userQueries";
import { removeTeamFromOrg } from "../../../apollo-graphql/teamOrgQueries";
import { Mutation } from "react-apollo";

import {
    OrgPageTeamCardWrapper,
    NewUserCardName,
    DeleteUserIcon,

} from '../../../layout/AdminComponents.js'

const AddTeamCard = (props) => {
    function handleAfterSubmit(org){
        props.handleAfterSubmit(org);
    }

    return (
        <Mutation mutation={removeTeamFromOrg}>
            {(removeTeamFromOrg, { data, loading }) => (
                <CardLeftWrapper>
                    <TeamForm
                        className="teamForm"
                        handleAfterSubmit={handleAfterSubmit}
                        activeView={props.org}
                        orgId={props.org._id}
                        variables={props.variables}
                    />
                    <div>
                    {(props.orgData || []).map(org => {
                        if (org._id === props.org._id) {
                            return (
                                (org.teams).map((team, i) => (
                                    <Link to='/team-admin' key={i}>
                                        <OrgPageTeamCardWrapper image key={i}>
                                            <Icon name='group'/>
                                            <NewUserCardName>{team.teamtitle}</NewUserCardName>
                                            <DeleteUserIcon>
                                                <Icon
                                                    size='large'
                                                    name='delete'
                                                    onClick={async e => {
                                                        console.log(team)
                                                        e.preventDefault();
                                                        await removeTeamFromOrg({
                                                        variables: {
                                                            teamId: team._id,
                                                            orgId: team.organization._id,
                                                            userId: props.variables.owner,
                                                            projects: team.projects.map((project) => project._id).toString(),
                                                            users: team.users.map((user) => user._id).toString(),
                                                            tasks: team.tasks.map((task) => task._id).toString(),
                                                            groups: team.groups.map((group) => group._id).toString(),
                                                        },
                                                            refetchQueries: [{query: getOrgByOwner, variables: props.variables}]
                                                        });
                                                    }}
                                                />
                                            </DeleteUserIcon>
                                        </OrgPageTeamCardWrapper>
                                    </Link>

                                ))
                            )
                        }
                    })}
                    </div>
                </CardLeftWrapper>
            )}
        </Mutation>
    );
};

export default AddTeamCard;
