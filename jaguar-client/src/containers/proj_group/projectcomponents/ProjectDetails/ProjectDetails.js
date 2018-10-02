import React, {Component} from 'react';
import { Dimmer, Loader, Form, Button, Card } from 'semantic-ui-react';
import { Query } from "react-apollo";
import TeamLeaderDropDown from "./TeamLeaderDropDown"
import moment from 'moment';
import { Mutation } from "react-apollo";
import {GroupFormWrapper} from '../../../layout/Proj_GroupComponents.js'
import ProjectTeamDropDown from './ProjectTeamDropDown.js'
import gql from "graphql-tag";
import ProjectDeleteButton from './ProjectDeleteButton';

const projectDetails = gql`
query project($_id: String!) {
    project(_id: $_id) {
        _id
        projecttitle
        projectdescription
        plannedcompletiondate
        projectplannedtime{
            _id
            time
        }
        projecttime{
            _id
          time
        }
        duedate
        users{
            _id
            username
        }
        defaultgroup {
            _id
            grouptitle
        }
        leader {
            _id
            username
        }    
        team {
            _id
            defaultproject{
                _id
            }
            teamtitle
            projects{
                _id
                groups{
                    _id
                }
            }
            organization{
                _id
            }
            users{
                _id
                username
            }
        }
        groups{
            _id
            grouptitle
            groupdescription
            iscompleted
            groupplannedtime{
                  _id
                  time
                }
            grouptime{
                _id
                time
            }
            tasks {
              _id
              iscompleted
              tasktitle
              taskdescription
              taskplannedtime{
                time
              }
              tasktime{
                time
                    user{
                    username
                        time{
                            time
                        }
                    }
                }
              group{
                _id
                }
              __typename
            }
        }
    }
}`;

const updateProject = gql`
    mutation updateProject(
        $_id: String,
        $projecttitle: String,
        $projectdescription: String,
        $plannedcompletiondate: Date,
        $duedate: Date,
        $leader: String, 
        $team: String
        $projectIdToChange: String,
        $projectsGroupIds: String,
        $projectsTeamId: String,
        $projectToChange: String,
        $targetTeam: String,
    ){ updateProject(
        _id: $_id,    
        projecttitle: $projecttitle,
        projectdescription: $projectdescription,
        plannedcompletiondate: $plannedcompletiondate,
        duedate: $duedate,
        leader: $leader, 
        team: $team 
        projectIdToChange: $projectIdToChange,
        projectsGroupIds: $projectsGroupIds,
        projectsTeamId: $projectsTeamId,
        projectToChange: $projectToChange
        targetTeam: $targetTeam
    ) {
        
        projecttitle
    }
}`;


class ProjectDetail extends Component {

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
        this.setState({groupDropDownChangeInput: false})
    };
    closeTeamDropDown = () => {
        this.setState({teamChangeInput: false})
    };
    closeAssignedLeaderDropDown = () => {
        this.setState({teamLeaderDropDownInput: false})
    };

    render() {
        const {selectedProject, userId,} = this.props;
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
            teamChangeInput,
            teamLeaderDropDownInput
        } = this.state;
        return (
            <Query query={projectDetails} variables={{_id: selectedProject}}>
                {({loading, error, data}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    if (error) return <p>No Project Selected</p>;
                    return (
                        <Mutation mutation={updateProject}>
                            {(updateProject, { loading }) => {
                                // if (loading) return (
                                //     <div>
                                //         <Dimmer active>
                                //             <Loader/>
                                //         </Dimmer>
                                //     </div>
                                // );
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
                                            {/*{teamChangeInput &&*/}
                                            {/*<ProjectTeamDropDown*/}
                                                {/*removeProjectSwitchForDefault={this.props.removeProjectSwitchForDefault}*/}
                                                {/*projectsGroupIds={data.project.groups.map(group => group._id)}*/}
                                                {/*projectsTeamId={data.project.team._id}*/}
                                                {/*orgIdForDropDown={data.project.team.organization._id}*/}
                                                {/*selectedProject={data.project._id}*/}
                                                {/*projectDetails={projectDetails}*/}
                                                {/*queryVariables={{_id: selectedProject}}*/}
                                                {/*leader={data.project.leader.username}*/}
                                                {/*closeDropDown={this.closeTeamDropDown}*/}
                                            {/*/>*/}
                                            {/*}*/}
                                            <div
                                                onClick={() => this.setState({teamLeaderDropDownInput: !teamLeaderDropDownInput})}>
                                                Assigned Leader: {data.project.leader.username}
                                            </div>
                                            {/*{teamLeaderDropDownInput &&*/}
                                            {/*<TeamLeaderDropDown*/}
                                                {/*selectedProject={selectedProject}*/}
                                                {/*projectDetails={projectDetails}*/}
                                                {/*queryVariables={{_id: selectedProject}}*/}
                                                {/*leader={data.project.leader.username}*/}
                                                {/*closeAssignedLeaderDropDown={this.closeAssignedLeaderDropDown}*/}
                                            {/*/>*/}
                                            {/*}*/}
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
                                                            update: async (store) => {
                                                                const { project } = store.readQuery({query: projectDetails, variables: {_id: selectedProject} });
                                                                if(title){ project.projecttitle = title}
                                                                if(description){ project.projectdescription = description}
                                                                if(plandate){ project.plannedcompletiondate = plandate}
                                                                if(duedate){ project.duedate = duedate}
                                                                // if(leader){ project.leader = leader}
                                                                await store.writeQuery({
                                                                    query: projectDetails,
                                                                    variables: {_id: selectedProject},
                                                                    data: { project }
                                                                });
                                                            }
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
                                                <ProjectDeleteButton data={data} userId={userId}/>
                                            </Button.Group>
                                        </Card.Content>
                                    </GroupFormWrapper>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Query>
            )
        }
    }

export default ProjectDetail