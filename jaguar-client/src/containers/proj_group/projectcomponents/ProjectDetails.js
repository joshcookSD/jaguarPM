import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader, Form, Button, Card } from 'semantic-ui-react';
import {
    removeProjectFromTeam,
    updateProject,
    userProjectGroups,
} from "../../apollo-graphql/groupProjectQueries";
import TeamLeaderDropDown from "./TeamLeaderDropDown"
import moment from 'moment';
import { Mutation } from "react-apollo";
import {
    GroupFormWrapper,
} from '../../layout/Proj_GroupComponents.js'
import ProjectTeamDropDown from './ProjectTeamDropDown.js'

class ProjectDetail extends Component {
    closeTeamDropDown = () => {
        this.setState({groupDropDownChangeInput: false})
    };

    state = {
        projectId: '',
        title: '',
        titleInput: false,
        descriptionInput: false,
        description: '',
        planDateInput: false,
        plandate: '',
        dueDateInput: false,
        duedate: '',
        leaderInput: false,
        leader: '',
        teamInput: false,
        team:'',
        teamChangeInput:false,
        teamLeaderDropDownInput:false,
    };

    closeTeamDropDown = () => {
        this.setState({teamChangeInput: false})
    };
    closeAssignedLeaderDropDown = () => {
        this.setState({teamLeaderDropDownInput: false})
    };

    render() {

        const {
            selectedProject,
            projectDetails,
            queryVariables,
            userTaskDetails,
            variables,
            userId,
            data
        } = this.props;

        const {
            title,
            titleInput,
            descriptionInput,
            planDateInput,
            plandate,
            dueDateInput,
            duedate,
            description,
            leader,
            projectId,
            teamChangeInput,
            teamLeaderDropDownInput
        } = this.state;

            return (
                <Mutation mutation={removeProjectFromTeam}>
                    {(removeProjectFromTeam, { loading }) => {
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader/>
                                </Dimmer>
                            </div>
                        );
                        return (
                            <Mutation mutation={updateProject}>
                                {(updateProject, { loading }) => {
                                    if (loading) return (
                                        <div>
                                            <Dimmer active>
                                                <Loader/>
                                            </Dimmer>
                                        </div>
                                    );
                                    return (
                                        <GroupFormWrapper onSubmit={() => updateProject()}>
                                            <div>
                                                <div className='cardHeader'
                                                     onClick={() => this.setState({titleInput: !titleInput, title:data.project.projecttitle })}>{!titleInput && data.project.projecttitle}</div>
                                                {titleInput &&
                                                <Form.Input
                                                    fluid
                                                    placeholder={data.project.projecttitle}
                                                    value={title}
                                                    onChange={e => this.setState({title: e.target.value})}
                                                />}
                                                <div className='metaTag' onClick={() => this.setState({
                                                    descriptionInput: !descriptionInput,
                                                    description: data.project.projectdescription
                                                })}>
                                                    Description: {!descriptionInput && data.project.projectdescription}
                                                </div>
                                                {descriptionInput &&
                                                <Form.Input
                                                    fluid
                                                    placeholder={data.project.projectdescription}
                                                    value={description}
                                                    onChange={e => this.setState({description: e.target.value})}
                                                />}
                                                <div className='cardDescription'
                                                     onClick={() => this.setState({planDateInput: !planDateInput})}>
                                                    Plan
                                                    Date: {data.project.plannedcompletiondate ? moment.utc(data.project.plannedcompletiondate).format('YYYY-MM-DD') : 'task needs to be planned'}
                                                </div>
                                                {planDateInput &&
                                                <Form.Input
                                                    fluid
                                                    type='date'
                                                    placeholder={plandate ? moment.utc(data.project.plannedcompletiondate).format('YYYY-MM-DD') : 'No plan date set'}
                                                    onChange={e => this.setState({plandate: e.target.value})}
                                                />}
                                                <div className='cardDescription'
                                                     onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                                    Due
                                                    Date: {data.project.duedate ? moment.utc(data.project.duedate).format('YYYY-MM-DD') : 'No due date set'}
                                                </div>
                                                {dueDateInput &&
                                                <Form.Input
                                                    fluid
                                                    type='date'
                                                    placeholder={duedate ? moment.utc(data.project.duedate).format('YYYY-MM-DD') : Date.now()}
                                                    onChange={e => this.setState({duedate: e.target.value})}
                                                />}
                                                <div className='cardDescription'>
                                                    Default
                                                    Group: {data.project.defaultgroup ? data.project.defaultgroup.grouptitle : 'no default'}
                                                </div>
                                                <div
                                                    onClick={() => this.setState({teamChangeInput: !teamChangeInput})}>
                                                    Currently Assigned Team: {data.project.team.teamtitle}
                                                </div>
                                                {teamChangeInput &&
                                                <ProjectTeamDropDown
                                                    removeProjectSwitchForDefault={this.props.removeProjectSwitchForDefault}
                                                    projectsGroupIds={data.project.groups.map(group => group._id)}
                                                    projectsTeamId={data.project.team._id}
                                                    orgIdForDropDown={data.project.team.organization._id}
                                                    selectedProject={data.project._id}
                                                    projectDetails={projectDetails}
                                                    queryVariables={{_id: selectedProject}}
                                                    leader={data.project.leader.username}
                                                    closeDropDown={this.closeTeamDropDown}
                                                />
                                                }
                                                <div
                                                    onClick={() => this.setState({teamLeaderDropDownInput: !teamLeaderDropDownInput})}>
                                                    Assigned Leader: {data.project.leader.username}
                                                </div>
                                                {teamLeaderDropDownInput &&
                                                <TeamLeaderDropDown
                                                    selectedProject={selectedProject}
                                                    projectDetails={projectDetails}
                                                    queryVariables={{_id: selectedProject}}
                                                    leader={data.project.leader.username}
                                                    closeAssignedLeaderDropDown={this.closeAssignedLeaderDropDown}
                                                />
                                                }
                                            </div>
                                            <Card.Content extra>
                                                <Button.Group fluid>
                                                    <Button
                                                        size='small'
                                                        type='submit'
                                                        color='green'
                                                        basic
                                                        onClick={async e => {
                                                            e.preventDefault();
                                                            await updateProject({
                                                                variables: {
                                                                    _id: selectedProject,
                                                                    projecttitle: title,
                                                                    projectdescription: description,
                                                                    plannedcompletiondate: plandate,
                                                                    duedate,
                                                                    leader,
                                                                },
                                                                refetchQueries:
                                                                    [{query: projectDetails, variables: queryVariables}]
                                                            });
                                                            this.setState({
                                                                titleInput: false,
                                                                descriptionInput: false,
                                                                planDateInput: false,
                                                                dueDateInput: false,
                                                                leaderInput: false,
                                                                teamInput: false,
                                                                teamLeaderDropDownInput: false,
                                                            })
                                                        }}>update</Button>
                                                    <Button size='small' basic color='red'
                                                        onClick={async e => {
                                                            e.preventDefault();
                                                                let arr = data.project.groups.map(group => group.grouptime.map(gt => gt._id));
                                                                let allGroupTimeIds = [].concat.apply([], arr);
                                                                let groupPlannedTimeArrays = data.project.groups.map(group => group.groupplannedtime.map(gpt => gpt._id))
                                                                let allGroupPlannedTimeIds = [].concat.apply([], groupPlannedTimeArrays);
                                                            const newDefualtProjectArray = data.project.team.projects.filter(project => project._id !== data.project.team.defaultproject._id);
                                                            if(newDefualtProjectArray.length === 0){
                                                                alert('cant must have one project in each team')
                                                            }else {
                                                                await removeProjectFromTeam({
                                                                    variables: {
                                                                        //users
                                                                        userId: userId,
                                                                        projectUsersIds: data.project.users.map((user) => user._id).toString(),
                                                                        //team
                                                                        projectsTeamId: data.project.team._id,
                                                                        //project
                                                                        projectToRemovesTasks:data.project.tasks.map(task => task._id),
                                                                        projectToRemoveId: data.project._id,
                                                                        projectPlannedTime: data.project.projectplannedtime.map(ppt => ppt._id).toString(),
                                                                        projectTime: data.project.projecttime.map(pt => pt._id).toString(),
                                                                        //group
                                                                        projectsGroups: data.project.groups.map((group) => group._id).toString(),
                                                                        projectsGroupsTasks: data.project.groups.map((group) => group.tasks.map((task) => task._id)).toString(),
                                                                        groupPlannedTime: allGroupPlannedTimeIds.toString(),
                                                                        groupTime: allGroupTimeIds.toString(),
                                                                        //defaults
                                                                        newDefaultProject: newDefualtProjectArray[0]._id,
                                                                        newDefaultProjectgroup: newDefualtProjectArray["0"].groups["0"]._id,
                                                                        teamsDefaultProject: data.project.team.defaultproject._id,
                                                                    },
                                                                    refetchQueries: [
                                                                        {
                                                                            query: userTaskDetails,
                                                                            variables: variables
                                                                        },
                                                                        {
                                                                            query: userProjectGroups,
                                                                            variables: variables
                                                                        }
                                                                    ]
                                                                });
                                                            }
                                                            this.props.removeProjectSwitchForDefault()
                                                        }}>remove</Button>
                                                </Button.Group>
                                            </Card.Content>
                                        </GroupFormWrapper>
                                    )
                                }}
                            </Mutation>
                        )
                    }}
                </Mutation>
            )
        }
    }

export default ProjectDetail