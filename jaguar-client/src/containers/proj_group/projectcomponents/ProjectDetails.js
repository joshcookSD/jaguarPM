import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { updateProject } from "../../apollo-graphql/groupProjectQueries";
import moment from 'moment';

class ProjectDetail extends Component {
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
        dueDateInput: false,
        leaderInput: false,
        leader: '',
        teamInput: false,
        team:'',
    };


    render() {
        const {selectedProject, projectDetails, queryVariables } = this.props;
        const {title, titleInput, descriptionInput, planDateInput, plandate, dueDateInput, duedate, leaderInput, description, leader, teamInput, team, projectId} = this.state;

        const _updateProject = async () => {
            await this.props.updateProject({
                variables: {_id: selectedProject, projecttitle: title, projectdescription: description, plannedcompletiondate: plandate, duedate, leader, team},
                refetchQueries: [{query: projectDetails, variables: queryVariables}]
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

        if(projectId) {
        return (
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
                                        Plan Completion: {!planDateInput && data.project.plannedcompletiondate ? moment(data.project.plannedcompletiondate).format('YYYY-MM-DD') : 'project needs to be planned'}
                                    </Card.Description>
                                    {planDateInput &&
                                    <Form.Input
                                        fluid
                                        type='date'
                                        placeholder={moment(data.project.plannedcompletiondate).format('YYYY-MM-DD')}
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
                                        onClick={() => this.setState({leaderInput: !leaderInput})}>
                                        Assigned: {!leaderInput && data.project.leader.username}
                                    </Card.Description>
                                    {leaderInput &&
                                    <Form.Input
                                        fluid
                                        placeholder={data.project.leader.username}
                                        value={leader}
                                        onChange={e => this.setState({leader: e.target.value})}
                                    />}
                                    <Card.Description
                                        onClick={() => this.setState({teamInput: !teamInput})}>
                                        Assigned: {!teamInput && data.project.team.username}
                                    </Card.Description>
                                    {teamInput &&
                                    <Form.Input
                                        fluid
                                        placeholder={data.project.team.teamtitle}
                                        value={team}
                                        onChange={e => this.setState({team: e.target.value})}
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
        )} else { return (<div/>)}
    }
}



export default graphql(updateProject, {
    name: 'updateProject',
})(ProjectDetail);


