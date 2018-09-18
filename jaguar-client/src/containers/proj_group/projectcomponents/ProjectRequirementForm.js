import React, {Component} from 'react';
import {projectDetails, createRequirement} from "../../apollo-graphql/groupProjectQueries";
import { Input, Form, Button, Checkbox } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import {createTimeProject, createPlannedTimeProject} from '../../apollo-graphql/timeQueries';
import decode from 'jwt-decode';
import moment from "moment/moment";
import gql from "graphql-tag";

const CREATE_REQUIREMENT = gql`
    mutation createRequirement(
       $requirementtitle : String
       $requirementdescription : String
       $project : String
       $isApproved : Boolean
       $duedate : Date
       $plannedcompletiondate : Date
       # $requirementplannedHours : Float
    ){ createRequirement(
        requirementtitle : $requirementtitle
        requirementdescription : $requirementdescription
        project : $project
        duedate : $duedate
        isApproved : $isApproved
        plannedcompletiondate : $plannedcompletiondate
        # requirementplannedHours : $requirementplannedHours
       ){
        requirementtitle
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
        const {  data } = this.props;
        const { title, description, isApproved, requirementplannedtime, plannedcompletiondate, duedate } = this.state;
        const project = data.project._id;

        return (


            <Mutation
                mutation={CREATE_REQUIREMENT}
                variables={{
                    requirementtitle : title,
                    requirementdescription : description,
                    project : project,
                    isApproved : isApproved,
                    duedate : duedate,
                    plannedcompletiondate : plannedcompletiondate,
                    requirementplannedHours : requirementplannedtime
                }}
                update={(store, { data }) =>
                    //null
                    console.log(data)
                    // this.props.updateStoreAfterVote(store, vote, this.props.link.id)
                }
            >
                {(createRequirement, {loading}) => {
                    return (
                        <div>
                            <Form onSubmit={createRequirement}>
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
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}
export default ProjectRequirementForm;