import React, {Component} from 'react';
import {projectDetails} from "../../../apollo-graphql/groupProjectQueries";
import { Input, Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import {createTimeProject, createPlannedTimeProject} from '../../../apollo-graphql/timeQueries';
import decode from 'jwt-decode';
import moment from "moment/moment";


class ProjectAddTimeForm extends Component {
    state = {
        actualtime: '',
        plannedTime:'',
        comment: '',
        plannedTimecomment: '',
    };

    render() {
        const {  data } = this.props;
        const { actualtime, comment, plannedTime, plannedTimecomment } = this.state;
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const project = data.project._id;
        const today = moment(Date.now()).format('YYYY-MM-DD');
        return (
            <Mutation mutation={createTimeProject}>
                {(createTimeProject, {loading}) => {
                    return (
                        <Mutation mutation={createPlannedTimeProject}>
                            {(createPlannedTimeProject, {loading}) => {
                                return (
                                    <div>
                                        <Form onSubmit={async e => {
                                            e.preventDefault();
                                            if (actualtime != null) {
                                                await createTimeProject({
                                                    variables: {
                                                        user: user._id,
                                                        project,
                                                        date: today,
                                                        time: actualtime,
                                                        timecomment: comment
                                                    },
                                                    refetchQueries: [
                                                        {query: projectDetails, variables: {_id: project}}
                                                    ]
                                                });
                                                this.setState({actualtime: '', comment: ''});
                                                this.props.onClose()
                                            }
                                            ;
                                        }}>
                                            <Form.Group style={{marginBottom: '2px'}} inline>
                                                <Form.Field width='six'>
                                                    <Input size='mini'
                                                           value={actualtime}
                                                           type='number'
                                                           step='0.25'
                                                           placeholder='time'
                                                           onChange={e => this.setState({actualtime: e.target.value})}
                                                    />
                                                </Form.Field>
                                                <Form.Field width='twelve'>
                                                    <Input size='mini'
                                                           value={comment}
                                                           type='text'
                                                           placeholder='comment'
                                                           action={{icon: 'add circle'}}
                                                           onChange={e => this.setState({comment: e.target.value})}
                                                    />
                                                </Form.Field>
                                                <Button
                                                    content='New Time!'
                                                    type='submit'
                                                    size='tiny'
                                                    basic color='green'
                                                    floated='right'
                                                />
                                            </Form.Group>
                                        </Form>
                                        <Form onSubmit={async e => {
                                            e.preventDefault();
                                            if (actualtime != null) {
                                                await createPlannedTimeProject({
                                                    variables: {
                                                        project,
                                                        date: today,
                                                        time: plannedTime,
                                                        timecomment: plannedTimecomment,
                                                        createdBy: user._id
                                                    },
                                                    refetchQueries: [
                                                        {query: projectDetails, variables: {_id: project}}
                                                    ]
                                                });
                                                this.setState({plannedTime: ''});
                                                this.props.onClose()
                                            }
                                            ;
                                        }}>
                                            <Form.Group style={{marginBottom: '2px'}} inline>
                                                <Form.Field width='six'>
                                                    <Input
                                                       size='mini'
                                                       value={plannedTime}
                                                       type='number'
                                                       step='0.25'
                                                       placeholder='planned time'
                                                       onChange={e => this.setState({plannedTime: e.target.value})}
                                                    />
                                                </Form.Field>
                                                <Form.Field width='twelve'>
                                                    <Input size='mini'
                                                           value={plannedTimecomment}
                                                           type='text'
                                                           placeholder='comment'
                                                           action={{icon: 'add circle'}}
                                                           onChange={e => this.setState({plannedTimecomment: e.target.value})}
                                                    />
                                                </Form.Field>
                                                <Button
                                                    content='Plan Time!'
                                                    type='submit'
                                                    size='tiny'
                                                    basic color='green'
                                                    floated='right'
                                                />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Mutation>
        );
    }
}
export default ProjectAddTimeForm;