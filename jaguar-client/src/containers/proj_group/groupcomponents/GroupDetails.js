import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { updateGroup} from "../../apollo-graphql/groupProjectQueries";
// import TeamLeaderDropDown from "./TeamLeaderDropDown"
import moment from 'moment';

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
            queryVariables
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
            groupId } = this.state;

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
                            <Form onSubmit={() => _updateGroup()}>
                                <Card fluid raised>
                                    <Card.Content>
                                        <Card.Header onClick={() => this.setState({titleInput: !titleInput})}>{!titleInput && data.group.grouptitle}</Card.Header>
                                        {/*header*/}
                                        {titleInput &&
                                        <Form.Input
                                            fluid
                                            placeholder={data.group.grouptitle}
                                            value={title}
                                            onChange={e => this.setState({title: e.target.value})}
                                        />}
                                        {/*description*/}
                                        <Card.Meta onClick={() => this.setState({descriptionInput: !descriptionInput})}>
                                            Description: {!descriptionInput && data.group.groupdescription}
                                        </Card.Meta>
                                        {descriptionInput &&
                                        <Form.Input
                                            fluid
                                            placeholder={data.group.groupdescription}
                                            value={description}
                                            onChange={e => this.setState({description: e.target.value})}
                                        />}
                                        {/*plan date*/}
                                        <Card.Description
                                            onClick={() => this.setState({planDateInput: !planDateInput})}>
                                            Plan Date: {data.group.plannedcompletiondate ? moment.utc(data.group.plannedcompletiondate).format('YYYY-MM-DD') : 'task needs to be planned'}
                                        </Card.Description>
                                        {planDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={plandate ?  moment.utc(data.group.plannedcompletiondate).format('YYYY-MM-DD') : 'No plan date set'}
                                            onChange={e => this.setState({plandate: e.target.value})}
                                        />}
                                        {/*due date*/}
                                        <Card.Description onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                            Due Date: {data.group.duedate ? moment.utc(data.group.duedate).format('YYYY-MM-DD') : 'No due date set'}
                                        </Card.Description>
                                        {dueDateInput &&
                                        <Form.Input
                                            fluid
                                            type='date'
                                            placeholder={duedate ? moment.utc(data.group.duedate).format('YYYY-MM-DD') : Date.now()}
                                            onChange={e => this.setState({duedate: e.target.value})}
                                        />}
                                        {/*assigned leader*/}
                                        <Card.Description>
                                            Group Users:
                                            {/*<TeamLeaderDropDown*/}
                                                {/*selectedProject={selectedProject}*/}
                                                {/*projectDetails={projectDetails}*/}
                                                {/*queryVariables={{_id: selectedProject}}*/}
                                                {/*leader={data.project.leader.username}*/}
                                            {/*/>*/}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button size='small' fluid type='submit'>update</Button>
                                    </Card.Content>
                                </Card>
                            </Form>
                        )
                    }
                    }
                </Query>
            )} else { return (<div/>)}
    }
}

export default graphql(updateGroup, {
    name: 'updateGroup',
})(GroupDetail);