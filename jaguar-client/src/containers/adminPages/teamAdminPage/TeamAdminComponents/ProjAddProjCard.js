import React from 'react';
import { Icon } from 'semantic-ui-react';
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
            {(removeProjectFromTeam, { data, loading }) => (
                <CardLeftWrapper>
                    {console.log(props.variables)}
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
                                                            e.preventDefault();
                                                            await removeProjectFromTeam({
                                                                variables: {
                                                            // task level
                                                                    projectGroupTasksComments : project.groups.map((group) => group.tasks.map(task => task.comments.map(comment => comment._id))).toString(),
                                                                    projectGroupTasks : project.groups.map((group) => group.tasks.map(task => task._id)).toString(),
                                                                    projectGroupTasksTime : project.groups.map((group) => group.tasks.map(task => task.tasktime.map(taskt => taskt._id))).toString(),
                                                                    taskplannedtime : project.groups.map((group) => group.tasks.map(task => task.tasktime.map(taskt => taskt._id))).toString(),

                                                            // group top level
                                                                    groupUsersId : project.groups.map((group) => group.users.map(user => user._id)).toString(),
                                                                    projectGroupComments : project.groups.map((group) => group.comments.map(comment => comment._id)).toString(),
                                                                    projectGroupGroupTime : project.groups.map((group) => group.grouptime.map(gt => gt._id)).toString(),
                                                                    projectGroupPlannedTime : project.groups.map((group) => group.groupplannedtime.map(gt => gt._id)).toString(),
                                                                    projectGroup : project.groups.map((group) => group._id).toString(),
                                                            // project level
                                                            //     project tasks
                                                                    projecLevelTasksComments : project.tasks.map((task) => task.comments.map(comment => comment._id)).toString(),
                                                                    projectlevelTasksTime : project.tasks.map((task) => task.tasktime.map(tt => tt._id)).toString(),
                                                                    projectTaskplannedtime : project.tasks.map((task) => task.projectplannedtime.map(ptt => ptt._id)).toString(),
                                                                    projectLevelTasks : project.tasks.map((task) => task._id).toString(),
                                                            //
                                                            // project top level
                                                            //         projectComments :
                                                            //         projectMilestone :
                                                                    projectUsersId :  project.users.map((user) => user._id).toString(),
                                                                    projectTime : project.users.map((user) => user._id).toString(),
                                                                    projectPlannedTime : project.projectplannedtime.map((ppt) => ppt._id).toString(),
                                                            //
                                                                    groupToDeleteId : project.groups.map((group) => group._id).toString(),
                                                                    projectId : project._id,
                                                                    projectTeam : project.team._id
                                                                },
                                                                refetchQueries: [{query: teamsByOwner, variables: props.variables}]
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

export default ProjAddProjCard;
