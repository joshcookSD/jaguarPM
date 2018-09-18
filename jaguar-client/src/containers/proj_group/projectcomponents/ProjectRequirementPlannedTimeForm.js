import React, {Component} from 'react';
import {projectDetails} from "../../apollo-graphql/groupProjectQueries";
import { Input, Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import {createPlannedTimeRequirement, plannedtimebyproject} from '../../apollo-graphql/timeQueries';
import decode from "jwt-decode";
import moment from 'moment';

class ProjectRequirementPlannedTimeForm extends Component {
    state = {
        plannedTime:''
    };

    render() {
        const { plannedTime } = this.state;
        const { project, reqId } = this.props;
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');


        return (
            <Mutation mutation={createPlannedTimeRequirement}>
                {(createPlannedTimeRequirement, {loading}) => {
                    return (
                        <div>
                            <Form onSubmit={async e => {
                                e.preventDefault();
                                    await createPlannedTimeRequirement({
                                        variables: {
                                            date: today,
                                            time: plannedTime,
                                            createdBy: user._id,
                                            user: user._id,
                                            requirement: reqId,
                                            project: project
                                        },
                                        refetchQueries: [
                                            {query: plannedtimebyproject, variables: {project: project}},
                                            {query: projectDetails, variables: {_id: project}}
                                        ]
                                    });
                                this.props.timeClose()
                            }}>
                                <Input
                                    size='mini'
                                    type='number'
                                    step='0.25'
                                    placeholder='time'
                                    onChange={e => this.setState({plannedTime: e.target.value})}
                                />
                                <Button
                                    content='Plan Time!'
                                    type='submit'
                                    size='tiny'
                                    basic color='green'
                                    floated='right'
                                />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}
export default ProjectRequirementPlannedTimeForm;