import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { Dimmer, Loader, Form, Button, Card } from 'semantic-ui-react';
import {removeGroupFromProject, updateGroup} from "../../apollo-graphql/groupProjectQueries";
import moment from 'moment';
import { Mutation } from "react-apollo";
import {
    GroupFormWrapper
} from '../../layout/Proj_GroupComponents.js'

class GroupDetail extends Component {
    // set selected project to state
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.selectedGroup !== this.props.selectedGroup) {
            this.setState({groupId: nextProps.selectedGroup});
        }
    }

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
    };

    render() {

        const {
            selectedGroup,
            groupDetails,
            queryVariables,
            userProjectGroups,
            variables
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
            // team,
            groupId
        } = this.state;

        //calling mutation with variables
        const _updateGroup = async () => {
            await this.props.updateGroup({
                variables: {
                    _id: selectedGroup,
                    grouptitle: title,
                    groupdescription: description,
                    plannedcompletiondate: plandate,
                    duedate,
                    // team
                },
                refetchQueries:
                    [{query: groupDetails, variables: queryVariables}]
            });
            //set all state booleans to false to close input form after update
            this.setState({
                titleInput: false,
                descriptionInput: false,
                planDateInput: false,
                dueDateInput: false,
                teamInput: false,
            })
        };

        if(groupId) {
            return (
                <Mutation mutation={removeGroupFromProject}>
                    {(removeGroupFromProject, { data, loading }) => (
                        <Query query={groupDetails} variables={queryVariables}>
                            {({loading, error, data}) => {
                                if (loading) return (
                                    <div>
                                        <Dimmer active>
                                            <Loader/>
                                        </Dimmer>
                                    </div>);
                                if (error) return <p>No Project Selected </p>;
                                return (
                                    <GroupFormWrapper onSubmit={() => _updateGroup()}>
                                        <div>
                                            <div className='cardHeader' onClick={() => this.setState({titleInput: !titleInput})}>{!titleInput && data.group.grouptitle}</div>
                                            {titleInput &&
                                            <Form.Input
                                                fluid
                                                placeholder={data.group.grouptitle}
                                                value={title}
                                                onChange={e => this.setState({title: e.target.value})}
                                            />}

                                            <div className='metaTag' onClick={() => this.setState({descriptionInput: !descriptionInput})}>
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
                                                Plan Date: {data.group.plannedcompletiondate ? moment.utc(data.group.plannedcompletiondate).format('YYYY-MM-DD') : 'task needs to be planned'}
                                            </div>
                                            {planDateInput &&
                                            <Form.Input
                                                fluid
                                                type='date'
                                                placeholder={plandate ?  moment.utc(data.group.plannedcompletiondate).format('YYYY-MM-DD') : 'No plan date set'}
                                                onChange={e => this.setState({plandate: e.target.value})}
                                            />}
                                            {/*due date*/}
                                            <div className='cardDescription' onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                                Due Date: {data.group.duedate ? moment.utc(data.group.duedate).format('YYYY-MM-DD') : 'No due date set'}
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
                                                Group Users:
                                                {data.group.users.map( (user, i ) => (
                                                    <span key={i}>{user.username}</span>
                                                 ))}
                                            </div>
                                        </div>
                                        <Card.Content extra>
                                            <Button.Group fluid>
                                                <Button size='small' type='submit' color='green' basic>update</Button>
                                                <Button size='small' basic color='red' onClick={async e => {
                                                    e.preventDefault();
                                                    await removeGroupFromProject({
                                                        variables: {
                                                            groupToRemoveId: data.group._id,
                                                            groupUsersIds: data.group.users.map((user) => user._id).toString(),
                                                            groupsTeamId: data.group.team._id,
                                                            groupsProjectId: data.group.project._id,
                                                            GroupsTasks: data.group.tasks.map((task) => task._id).toString()
                                                        },
                                                        refetchQueries: [{query: userProjectGroups, variables: variables}]
                                                    });
                                                    this.props.removeGroupSwitchForDefault()
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

export default graphql(updateGroup, {
    name: 'updateGroup',
})(GroupDetail);