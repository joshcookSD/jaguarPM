import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { projectDetails} from "../../apollo-graphql/groupProjQueries";
import moment from 'moment';

// projecttitle: String
// projectdescription: String
// plannedcompletiondate: String
// duedate: String
// leader: User
// team: Team

class ProjectDetail extends Component {
    state = {
        title: '',
        titleInput: false,
        descriptionInput: false,
        description: '',
        planDateInput: false,
        dueDateInput: false,
        leaderInput: false,
        leader: '',
        teamInput: false,
        team:'',
    };

    render() {
        const {projectId} = this.props;
        const queryVariables = {_id: projectId};
        const {title, titleInput, descriptionInput, planDateInput, dueDateInput, leaderInput, description, leader, teamInput, team} = this.state;

        const _updateProject = async () => {
            await this.props.updateProject({
                variables: {_id: projectId, tasktitle, taskdescription: description, assigned},
                refetchQueries: [{query: task, variables: queryVariables}]
            });
            this.setState({
                titleInput: false,
                descriptionInput: false,
                planDateInput: false,
                dueDateInput: false,
                leaderInput: false,
                teamInput: false,
            })
        };

        return (
            <Query query={projectDetails} variables={queryVariables}>
                {({loading, error, data}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return (
                        <Form onSubmit={() => _updateProject()}>
                            <Card fluid raised>
                                <Card.Content>
                                    <Card.Header onClick={() => this.setState({titleInput: !titleInput})}>{!titleInput && data.project.projecttitle}</Card.Header>
                                    {titleInput &&
                                    <Form.Input
                                        fluid
                                        placeholder={data.project.projecttitle}
                                        value={title}
                                        onChange={e => this.setState({title: e.target.value})}
                                    />}
                                    <Card.Meta onClick={() => this.setState({descriptionInput: !descriptionInput})}>
                                        Description: {!descriptionInput && data.project.projectdescription}
                                    </Card.Meta>
                                    {descriptionInput &&
                                    <Form.Input
                                        fluid
                                        placeholder={data.project.projectdescription}
                                        value={description}
                                        onChange={e => this.setState({description: e.target.value})}
                                    />}
                                    <Card.Description
                                        onClick={() => this.setState({planDateInput: !planDateInput})}>
                                        Plan Date: {!planDateInput && data.project.plandate ? moment(data.project.plandate).format('YYYY-MM-DD') : 'project needs to be planned'}
                                    </Card.Description>
                                    {planDateInput &&
                                    <Form.Input
                                        fluid
                                        type='date'
                                        placeholder={moment(data.project.plandate).format('YYYY-MM-DD')}
                                    />}
                                    <Card.Description onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                        Due Date: {!dueDateInput && data.project.duedate ? moment(data.project.duedate).format('YYYY-MM-DD') : 'No due date set'}
                                    </Card.Description>
                                    {dueDateInput &&
                                    <Form.Input
                                        fluid
                                        type='date'
                                        placeholder={moment(data.project.duedate).format('YYYY-MM-DD')}
                                    />}
                                    <Card.Description
                                        onClick={() => this.setState({assignedInput: !assignedInput})}>
                                        Assigned: {!assignedInput && data.project.projectcurrentowner.username}
                                    </Card.Description>
                                    {assignedInput &&
                                    <Form.Input
                                        fluid
                                        placeholder={data.project.projectcurrentowner.username}
                                        value={assigned}
                                        onChange={e => this.setState({assigned: e.target.value})}
                                    />}
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
        )
    }
}

export default graphql(updateProject, {
    name: 'updateProject',
})(ProjectDetail);