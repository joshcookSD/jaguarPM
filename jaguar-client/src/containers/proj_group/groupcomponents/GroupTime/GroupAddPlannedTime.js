import React, {Component} from 'react';
import {projectDetails} from "../../../apollo-graphql/groupProjectQueries";
import { Input, Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import { plannedtimebyproject} from '../../../apollo-graphql/timeQueries';
import gql from "graphql-tag";

const plannedtimebygroup = gql`
 query plannedtimebygroup($group: String!){
      plannedtimebygroup(group: $group) {
           _id
            time
        }
 }
 `;

const createPlannedTimeGroup = gql`
mutation createPlannedTimeGroup(
    $time: Float!, 
    $date: Date, 
    $createdBy: String, 
    $group: String,
    $task: String 
    $user: String
    $project: String
) {
    createPlannedTimeGroup(
    time: $time, 
    date: $date, 
    createdBy: $createdBy, 
    group: $group
    task: $task
    user: $user
    project: $project
    ) {
         _id
        time
    }
}
`;

class GroupTaskTimeModalForm extends Component {
    state = {
        actualtime: '',
        plannedTime:'',
        comment: '',
        plannedTimecomment: '',
    };

    render() {
        const { taskId, userId, date, group, project, selectedGroup } = this.props;
        const { actualtime, comment, plannedTime, plannedTimecomment } = this.state;
        return (
            <Mutation mutation={createPlannedTimeGroup}>
                {(createPlannedTimeGroup, {loading}) => {
                    return (
                        <div>
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
                                        update: async (store, {data: newTime}) => {
                                            const data = store.readQuery({query: plannedtimebygroup, variables: {group: selectedGroup}  });
                                            data.plannedtimebygroup.push(newTime.createPlannedTimeGroup);
                                            await store.writeQuery({
                                                query: plannedtimebygroup,
                                                variables: {group: selectedGroup},
                                                data: data
                                            });
                                        }
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
        );
    }
}
export default GroupTaskTimeModalForm;