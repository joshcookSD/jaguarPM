import React from 'react';
import { Icon, Dimmer, Loader } from 'semantic-ui-react';
import ProjectForm from '../../../proj_group/projectcomponents/ProjectForm';
import { Link } from 'react-router-dom';
import { CardLeftWrapper } from '../../../layout/AdminComponents.js'
import {teamsByOwner} from "../../../apollo-graphql/userQueries";
import { removeProjectFromTeam } from "../../../apollo-graphql/groupProjectQueries";
import { Mutation } from "react-apollo";


import {
    OrgPageTeamCardWrapper,
    NewUserCardName,
    DeleteUserIcon,
} from '../../../layout/AdminComponents.js'

const ProjAddProjCard = (props) => {
    function handleAfterSubmit(team){
        props.handleAfterSubmit(team);
    }

    return (
        <Mutation mutation={removeProjectFromTeam}>
            {(removeProjectFromTeam, { data, loading }) => {
                if (loading) return (
                    <div>
                        <Dimmer active>
                            <Loader/>
                        </Dimmer>
                    </div>
                );
                return (
                    <CardLeftWrapper>
                        <ProjectForm
                            className="projectForm"
                            handleAfterSubmit={handleAfterSubmit}
                            activeView={props.team}
                            teamId={props.team._id}
                            variables={props.variables}
                        />
                        <div>
                            {(props.teamData || []).map((team, i) => {
                                if (team._id === props.team._id) {
                                    return (
                                        (team.projects || []).map((project, i) => (
                                            <Link to='/project-admin' key={i}>
                                                <OrgPageTeamCardWrapper image key={i}>
                                                    <Icon name='group'/>
                                                    <NewUserCardName>{project.projecttitle}</NewUserCardName>
                                                    <DeleteUserIcon>
                                                        <Icon
                                                            size='large'
                                                            name='delete'
                                                            onClick={async e => {
                                                                console.log(project)
                                                                e.preventDefault();
                                                                await removeProjectFromTeam({
                                                                    variables: {
                                                                        projectToRemoveId: project._id,
                                                                        projectUsersIds: project.users.map((user) => user._id).toString(),
                                                                        projectsTeamId: project.team._id,
                                                                        projectsGroupsTasks: project.groups.map((group) => group.tasks.map((task) => task._id)).toString(),
                                                                        projectsGroups: project.groups.map((group) => group._id).toString()
                                                                    },
                                                                    refetchQueries: [{
                                                                        query: teamsByOwner,
                                                                        variables: props.variables
                                                                    }]
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
                )
            }}
        </Mutation>
    );
};

export default ProjAddProjCard;
