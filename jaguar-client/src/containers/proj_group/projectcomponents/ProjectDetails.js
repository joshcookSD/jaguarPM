import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { Card, Dimmer, Loader, Form, Button} from 'semantic-ui-react';
import { updateProject} from "../../apollo-graphql/groupProjectQueries";
import TeamLeaderDropDown from "./TeamLeaderDropDown"
import moment from 'moment';

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
    };

    render() {

        const {
            selectedProject,
            projectDetails,
            queryVariables  } = this.props;

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
            projectId
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
            <Query query={projectDetails} variables={queryVariables}>
                {({loading, error, data}) => {
                    console.log(data);
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
                                    {/*header*/}
                                    {titleInput &&
                                    <Form.Input
                                        fluid
                                        placeholder={data.project.projecttitle}
                                        value={title}
                                        onChange={e => this.setState({title: e.target.value})}
                                    />}
                                    {/*description*/}
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
                                    {/*plan date*/}
                                    <Card.Description
                                        onClick={() => this.setState({planDateInput: !planDateInput})}>
                                        Plan Date: {data.project.plannedcompletiondate ? moment.utc(data.project.plannedcompletiondate).format('YYYY-MM-DD') : 'task needs to be planned'}
                                    </Card.Description>
                                    {planDateInput &&
                                    <Form.Input
                                        fluid
                                        type='date'
                                        placeholder={plandate ?  moment.utc(data.project.plannedcompletiondate).format('YYYY-MM-DD') : 'No plan date set'}
                                        onChange={e => this.setState({plandate: e.target.value})}
                                    />}
                                    {/*due date*/}
                                    <Card.Description onClick={() => this.setState({dueDateInput: !dueDateInput})}>
                                        Due Date: {data.project.duedate ? moment.utc(data.project.duedate).format('YYYY-MM-DD') : 'No due date set'}
                                    </Card.Description>
                                    {dueDateInput &&
                                    <Form.Input
                                        fluid
                                        type='date'
                                        placeholder={duedate ? moment.utc(data.project.duedate).format('YYYY-MM-DD') : Date.now()}
                                        onChange={e => this.setState({duedate: e.target.value})}
                                    />}
                                    {/*default group*/}
                                    <Card.Description>
                                        Default Group: {data.project.defaultgroup ? data.project.defaultgroup.grouptitle : 'no default'}
                                    </Card.Description>

                                    {/*assigned leader*/}
                                    <Card.Description>
                                   Assigned Leader:
                                        <TeamLeaderDropDown
                                        selectedProject={selectedProject}
                                        projectDetails={projectDetails}
                                        queryVariables={{_id: selectedProject}}
                                        leader={data.project.leader.username}
                                    />
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




export default graphql(updateProject, {
    name: 'updateProject',
})(ProjectDetail);


