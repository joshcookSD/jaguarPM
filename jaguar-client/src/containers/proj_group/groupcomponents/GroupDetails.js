import React, {Component} from 'react';
import { Dimmer, Loader, Form, Button, Card } from 'semantic-ui-react';
import { removeGroupFromProject, updateGroup, groupDetails,} from "../../apollo-graphql/groupProjectQueries";
import moment from 'moment';
import GroupProjectDropDown from './GroupProjectDropDown';
import { Mutation } from "react-apollo";
import {GroupFormWrapper} from '../../layout/Proj_GroupComponents.js'

class GroupDetail extends Component {
    closeTeamDropDown = () => {
        this.setState({groupDropDownChangeInput: false})
    };

    state = {
        groupId: '',
        title: '',
        titleInput: false,
        descriptionInput: false,
        description: '',
        planDateInput: false,
        plandate: '',
        dueDateInput: false,
        duedate: '',
        teamInput: false,
        team:'',
        groupDropDownChangeInput: false,
    };

    render() {
        const {
            selectedGroup,
            queryVariables,
            userProjectGroups,
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
            groupDropDownChangeInput
        } = this.state;

                return (
                    <Mutation mutation={removeGroupFromProject}>
                        {(removeGroupFromProject, {loading}) => {
                            if (loading) return (
                                <div>
                                    <Dimmer active>
                                        <Loader/>
                                    </Dimmer>
                                </div>
                            );
                            return (
                                <Mutation mutation={updateGroup}>
                                    {(updateGroup, {loading}) => {
                                        if (loading) return (
                                            <div>
                                                <Dimmer active>
                                                    <Loader/>
                                                </Dimmer>
                                            </div>
                                        );
                                        return (
                                            <GroupFormWrapper onSubmit={() => updateGroup()}>
                                                <div>
                                                    {console.log(data)}
                                                    <div className='cardHeader'
                                                         onClick={() => this.setState({
                                                             titleInput: !titleInput,
                                                             title: data.group.grouptitle
                                                         })}>{!titleInput && data.group.grouptitle}</div>
                                                    {titleInput &&
                                                    <Form.Input
                                                        fluid
                                                        placeholder={data.group.grouptitle}
                                                        value={title}
                                                        onChange={e => this.setState({title: e.target.value})}
                                                    />}

                                                    <div className='metaTag'
                                                         onClick={() => this.setState({
                                                             descriptionInput: !descriptionInput,
                                                             description: data.group.groupdescription
                                                         })}
                                                    >
                                                        Description: {!descriptionInput && data.group.groupdescription}
                                                    </div>
                                                    {descriptionInput &&
                                                    <Form.Input
                                                        fluid
                                                        placeholder={data.group.groupdescription}
                                                        value={description}
                                                        onChange={e => this.setState({description: e.target.value})}
                                                    />}
                                                    {/*plan date*/}
                                                    <div className='cardDescription'
                                                         onClick={() => this.setState({planDateInput: !planDateInput})}>
                                                        Plan
                                                        Date: {data.group.plannedcompletiondate ? moment.utc(data.group.plannedcompletiondate).format('YYYY-MM-DD') : 'task needs to be planned'}
                                                    </div>
                                                    {planDateInput &&
                                                    <Form.Input
                                                        fluid
                                                        type='date'
                                                        placeholder={plandate ? moment.utc(data.group.plannedcompletiondate).format('YYYY-MM-DD') : 'No plan date set'}
                                                        onChange={e => this.setState({plandate: e.target.value})}
                                                    />}
                                                    {/*due date*/}
                                                    <div className='cardDescription'
                                                         onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                                        Due
                                                        Date: {data.group.duedate ? moment.utc(data.group.duedate).format('YYYY-MM-DD') : 'No due date set'}
                                                    </div>
                                                    {dueDateInput &&
                                                    <Form.Input
                                                        fluid
                                                        type='date'
                                                        placeholder={duedate ? moment.utc(data.group.duedate).format('YYYY-MM-DD') : Date.now()}
                                                        onChange={e => this.setState({duedate: e.target.value})}
                                                    />}
                                                    {/*assigned leader*/}
                                                    <div className='cardDescription'>
                                                        Group Users: {data.group.users.map((user, i) => (
                                                        <span key={i}>{user.username}</span>
                                                    ))}
                                                    </div>
                                                    <div
                                                        onClick={() => this.setState({groupDropDownChangeInput: !groupDropDownChangeInput})}>
                                                        Currently Assigned project: {data.group.project.projecttitle}
                                                    </div>
                                                    {groupDropDownChangeInput &&
                                                    <GroupProjectDropDown
                                                        groupProject={data.group.project._id}
                                                        selectedTeamId={data.group.team._id}
                                                        selectedGroup={data.group._id}
                                                        closeTeamDropDown={this.closeTeamDropDown}
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
                                                                await updateGroup({
                                                                    variables: {
                                                                        _id: selectedGroup,
                                                                        grouptitle: title,
                                                                        groupdescription: description,
                                                                        plannedcompletiondate: plandate,
                                                                        duedate,
                                                                    },
                                                                    refetchQueries:
                                                                        [{query: groupDetails, variables: queryVariables}]
                                                                });
                                                                this.setState({
                                                                    titleInput: false,
                                                                    descriptionInput: false,
                                                                    planDateInput: false,
                                                                    dueDateInput: false,
                                                                    teamInput: false,
                                                                })
                                                            }}>update</Button>
                                                        <Button size='small' basic color='red' onClick={async e => {
                                                            e.preventDefault();
                                                            const newDefualtGroupArray = data.group.project.groups.filter(group => group._id !== data.group.project.defaultgroup._id);
                                                            if (newDefualtGroupArray.length === 0) {
                                                                alert('cant must have one group in each project')
                                                            } else {
                                                                await removeGroupFromProject({
                                                                    variables: {
                                                                        groupToRemoveId: data.group._id,
                                                                        groupUsersIds: data.group.users.map((user) => user._id).toString(),
                                                                        groupsTeamId: data.group.team._id,
                                                                        groupsProjectId: data.group.project._id,
                                                                        GroupsTasks: data.group.tasks.map((task) => task._id).toString(),
                                                                        newDefaultGroupForProj: newDefualtGroupArray[0]._id,
                                                                        projectsDefualtGroup: data.group.project.defaultgroup._id,
                                                                        userId: userId
                                                                    },
                                                                    refetchQueries: [{
                                                                        query: userProjectGroups,
                                                                        variables: variables
                                                                    }]
                                                                });
                                                            }
                                                            this.props.removeGroupSwitchForDefault()
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

export default GroupDetail