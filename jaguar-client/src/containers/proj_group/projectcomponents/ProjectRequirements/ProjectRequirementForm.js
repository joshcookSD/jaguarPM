import React, {Component} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const projectRequirements = gql`
query project($_id: String!) {
    project(_id: $_id){
        _id
        requirements{
            _id
            isApproved
            requirementtitle
            requirementdescription
            duedate
            requirementplannedtime{
                _id
                time
                }
            group{
                _id
                groupplannedtime{
                    _id
                }
                grouptime{
                    _id
                }
                comments{
                    _id
                }
                tasks{
                    _id
                    taskplannedtime{
                        _id
                    }
                    tasktime{
                        _id
                    }
                    comments{
                        _id
                    }
                }
            }
        }
    }
}`;

const CREATE_REQUIREMENT = gql`
    mutation createRequirement(
       $requirementtitle : String
       $requirementdescription : String
       $project : String
       $isApproved : Boolean
       $duedate : Date
       $plannedcompletiondate : Date
       # $requirementplannedHours : Float
    )
    { 
    createRequirement(
        requirementtitle : $requirementtitle
        requirementdescription : $requirementdescription
        project : $project
        duedate : $duedate
        isApproved : $isApproved
        plannedcompletiondate : $plannedcompletiondate
        # requirementplannedHours : $requirementplannedHours
       )
        {
            _id
            isApproved
            requirementtitle
            requirementdescription
            duedate
            requirementplannedtime{
                _id
                time
            }
            project{
                _id
                projecttitle
            }
            group{
                _id
                groupplannedtime{
                    _id
                }
                grouptime{
                    _id
                }
                comments{
                    _id
                }
                tasks{
                    _id
                    taskplannedtime{
                        _id
                    }
                    tasktime{
                        _id
                    }
                    comments{
                        _id
                    }
                }
            }
        }
    }
`;

class ProjectRequirementForm extends Component {
    state = {
        title:'',
        description:'',
        duedate: '',
        plannedcompletiondate:'',
        requirementplannedtime:'',
    };


    render() {
        const { selectedProject } = this.props;
        const { title, description, isApproved, requirementplannedtime, plannedcompletiondate, duedate } = this.state;
        return (
            <Mutation mutation={CREATE_REQUIREMENT}>
                {(createRequirement, {loading}) => {
                    return (
                        <div>
                            <Form onSubmit={ async e => {
                                e.preventDefault();
                                await createRequirement({variables:{
                                        requirementtitle : title,
                                        requirementdescription : description,
                                        project : selectedProject,
                                        isApproved : isApproved,
                                        duedate : duedate,
                                        plannedcompletiondate : plannedcompletiondate,
                                        requirementplannedHours : requirementplannedtime
                                    },
                                    update: async (store, { data: newRequirement }) => {
                                        const { project } = store.readQuery({query: projectRequirements, variables: {_id: selectedProject} });
                                        await project.requirements.push(newRequirement.createRequirement);
                                        await store.writeQuery({
                                            query: projectRequirements,
                                            variables: {_id: selectedProject},
                                            data: { project }
                                        });
                                    }
                                });
                                this.props.onClose()
                            }}>
                                <Form.Field>
                                    <label>title</label>
                                    <input
                                        placeholder='requirement title'
                                        onChange={e => this.setState({title: e.target.value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>description</label>
                                    <input
                                        placeholder='requirement description'
                                        onChange={e => this.setState({description: e.target.value})}
                                    />
                                </Form.Field>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label='planned completion date'
                                        type='date'
                                        onChange={e => this.setState({plannedcompletiondate: e.target.value})}
                                    />
                                    <Form.Input
                                        label='due date'
                                        type='date'
                                        onChange={e => this.setState({duedate: e.target.value})}
                                    />
                                    {/*<Form.Input*/}
                                        {/*label='requirment planned time'*/}
                                        {/*value={requirementplannedtime}*/}
                                        {/*type='number'*/}
                                        {/*step='0.25'*/}
                                        {/*placeholder='time'*/}
                                        {/*onChange={e => this.setState({requirementplannedtime: e.target.value})}*/}
                                    {/*/>*/}
                                </Form.Group>
                                <Button
                                    floated='right'
                                    content='new requirement'
                                    type='submit'
                                    color='green'
                                />
                                <Form.Field></Form.Field>
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}
export default ProjectRequirementForm;