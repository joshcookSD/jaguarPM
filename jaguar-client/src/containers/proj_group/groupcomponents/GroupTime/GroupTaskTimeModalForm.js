import React, {Component} from 'react';
import {projectDetails} from "../../../apollo-graphql/groupProjectQueries";
import { Input, Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import {createPlannedTimeGroup, createGroupTime, plannedtimebyproject} from '../../../apollo-graphql/timeQueries';

class GroupTaskTimeModalForm extends Component {
    state = {
        actualtime: '',
        plannedTime:'',
        comment: '',
        plannedTimecomment: '',
    };

    render() {
        const { taskId, userId, date, group, project } = this.props;
        const { actualtime, comment, plannedTime, plannedTimecomment } = this.state;

        return (
            <Mutation mutation={createPlannedTimeGroup}>
                {(createPlannedTimeGroup, {loading}) => {
                    return (
                        <Mutation mutation={createGroupTime}>
                            {(createGroupTime, {loading}) => {
                                return (
                                    <div>
                                        <Form onSubmit={async e => {
                                            e.preventDefault();
                                            if (actualtime != null) {
                                                await createGroupTime({
                                                    variables: {
                                                        user: userId,
                                                        group,
                                                        task: taskId,
                                                        date: date,
                                                        time: actualtime,
                                                        timecomment: comment
                                                    },
                                                    refetchQueries: [
                                                        {query: plannedtimebyproject, variables: {project: project}},
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
                                                await createPlannedTimeGroup({
                                                    variables: {
                                                        task: taskId,
                                                        group,
                                                        date: date,
                                                        time: plannedTime,
                                                        createdBy: userId,
                                                        user: userId,
                                                        project: project
                                                    },
                                                    refetchQueries: [
                                                        {query: plannedtimebyproject, variables: {project: project}},
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
export default GroupTaskTimeModalForm;