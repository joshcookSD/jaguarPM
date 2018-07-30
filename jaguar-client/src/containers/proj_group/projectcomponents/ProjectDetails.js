import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { Dimmer, Loader, Form, Button, Card, Icon } from 'semantic-ui-react';
import {
    removeProjectFromTeam,
    updateProject,
    userProjectGroups
} from "../../apollo-graphql/groupProjectQueries";
import TeamLeaderDropDown from "./TeamLeaderDropDown"
import moment from 'moment';
import { Mutation } from "react-apollo";
import {
    GroupFormWrapper,
} from '../../layout/Proj_GroupComponents.js'
import ProjectTeamDropDown from './ProjectTeamDropDown.js'
import {task} from "../../apollo-graphql/taskQueries";


class ProjectDetail extends Component {
    // set selected project to state
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.selectedProject !== this.props.selectedProject) {
            this.setState({projectId: nextProps.selectedProject});
        }
    }

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
        teamChangeInput:false
    };

    closeDropDown = () => {
        this.setState({teamChangeInput: false})
    };

    render() {

        const {
            selectedProject,
            projectDetails,
            queryVariables,
            userTaskDetails,
            variables,
            orgIdForDropDown,
            projectsTeamId,
            projectsGroupIds
        } = this.props;

        //state shortcut
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
            teamChangeInput
        } = this.state;

        //calling mutation with variables
        const _updateProject = async () => {
            await this.props.updateProject({
                variables: {
                    _id: selectedProject,
                    projecttitle: title,
                    projectdescription: description,
                    plannedcompletiondate: plandate,
                    duedate,
                    leader,
                    // team
                },
                refetchQueries:
                    [{query: projectDetails, variables: queryVariables}]
            });
            //set all state booleans to false to close input form after update
            this.setState({
                titleInput: false,
                descriptionInput: false,
                planDateInput: false,
                dueDateInput: false,
                leaderInput: false,
                teamInput: false,
            })
        };

        if(projectId) {
        return (
            <Mutation mutation={removeProjectFromTeam}>
                {(removeProjectFromTeam, { loading }) => (
                    <Query query={projectDetails} variables={queryVariables}>
                        {({loading, error, data}) => {
                             if (loading) return (
                                <div>
                                    <Dimmer active>
                                        <Loader/>
                                    </Dimmer>
                                </div>);
                            if (error) return <p>No Project Selected {projectId}</p>;
                            return (
                                <GroupFormWrapper onSubmit={() => _updateProject()}>
                                        <div>
                                            <div className='cardHeader' onClick={() => this.setState({titleInput: !titleInput})}>{!titleInput && data.project.projecttitle}</div>
                                            {titleInput &&
                                            <Form.Input
                                                fluid
                                                placeholder={data.project.projecttitle}
                                                value={title}
                                                onChange={e => this.setState({title: e.target.value})}
                                            />}
                                            <div className='metaTag' onClick={() => this.setState({descriptionInput: !descriptionInput})}>
                                                Description: {!descriptionInput && data.project.projectdescription}
                                            </div>
                                            {descriptionInput &&
                                            <Form.Input
                                                fluid
                                                placeholder={data.project.projectdescription}
                                                value={description}
                                                onChange={e => this.setState({description: e.target.value})}
                                            />}
                                            {/*plan date*/}
                                            <div className='cardDescription'
                                                onClick={() => this.setState({planDateInput: !planDateInput})}>
                                                Plan Date: {data.project.plannedcompletiondate ? moment.utc(data.project.plannedcompletiondate).format('YYYY-MM-DD') : 'task needs to be planned'}
                                            </div>
                                            {planDateInput &&
                                            <Form.Input
                                                fluid
                                                type='date'
                                                placeholder={plandate ?  moment.utc(data.project.plannedcompletiondate).format('YYYY-MM-DD') : 'No plan date set'}
                                                onChange={e => this.setState({plandate: e.target.value})}
                                            />}

                                            {/*due date*/}
                                            <div className='cardDescription' onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                                Due Date: {data.project.duedate ? moment.utc(data.project.duedate).format('YYYY-MM-DD') : 'No due date set'}
                                            </div>
                                            {dueDateInput &&
                                            <Form.Input
                                                fluid
                                                type='date'
                                                placeholder={duedate ? moment.utc(data.project.duedate).format('YYYY-MM-DD') : Date.now()}
                                                onChange={e => this.setState({duedate: e.target.value})}
                                            />}

                                            <div className='cardDescription'>
                                                Default Group: {data.project.defaultgroup ? data.project.defaultgroup.grouptitle : 'no default'}
                                            </div>

                                            <div
                                                onClick={() => this.setState({teamChangeInput: !teamChangeInput})}>
                                                Currently Assigned Team: change teams
                                            </div>

                                            {teamChangeInput &&
                                                <ProjectTeamDropDown
                                                    removeProjectSwitchForDefault={this.props.removeProjectSwitchForDefault}
                                                    projectsGroupIds={projectsGroupIds}
                                                    projectsTeamId={projectsTeamId}
                                                    orgIdForDropDown={orgIdForDropDown}
                                                    selectedProject={selectedProject}
                                                    projectDetails={projectDetails}
                                                    queryVariables={{_id: selectedProject}}
                                                    leader={data.project.leader.username}
                                                    closeDropDown={this.closeDropDown}
                                                />
                                            }

                                            <div className='assignedLeader'>
                                                Assigned Leader:
                                                <TeamLeaderDropDown
                                                    selectedProject={selectedProject}
                                                    projectDetails={projectDetails}
                                                    queryVariables={{_id: selectedProject}}
                                                    leader={data.project.leader.username}
                                                />
                                            </div>
                                        </div>
                                    <Card.Content extra>
                                        <Button.Group fluid>
                                            <Button size='small' type='submit' color='green' basic>update</Button>
                                            <Button size='small' basic color='red' onClick={async e => {
                                                e.preventDefault();
                                                await removeProjectFromTeam({
                                                    variables: {
                                                            projectToRemoveId : data.project._id,
                                                            projectUsersIds : data.project.users.map((user) => user._id).toString(),
                                                            projectsTeamId : data.project.team._id,
                                                            projectsGroupsTasks : data.project.groups.map((group) => group.tasks.map((task) => task._id)).toString(),
                                                            projectsGroups : data.project.groups.map((group) => group._id).toString(),
                                                    },
                                                    refetchQueries: [
                                                        {query: userTaskDetails, variables: variables},
                                                        {query: userProjectGroups, variables: variables}
                                                    ]
                                                });
                                                this.props.removeProjectSwitchForDefault()
                                            }} >remove</Button>
                                        </Button.Group>
                                    </Card.Content>
                                </GroupFormWrapper>
                            )
                        }
                        }
                    </Query>
                )}
            </Mutation>
        )} else { return (<div/>)}
    }
}

export default graphql(updateProject, {
    name: 'updateProject',
})(ProjectDetail);


