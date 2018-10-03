import React, {Component} from 'react';
import { Input, Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const createGroupTime = gql`
mutation createGroupTime($time: Float!, $timecomment: String, $date: Date, $task:String, $user: String, $group: String) {
    createGroupTime(time: $time, timecomment:$timecomment, date: $date, task: $task, user: $user, group: $group ) {
        _id
        time
    }
}
`;

const timeByGroup = gql`
    query timeByGroup($group: String!){
        timeByGroup(group: $group) {
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
        const { taskId, userId, date, group, project, selectedGroup} = this.props;
        const { actualtime, comment, plannedTime, plannedTimecomment } = this.state;
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
                                        update: async (store, {data: newTime}) => {
                                            const data = store.readQuery({query: timeByGroup, variables: {group: selectedGroup}  });
                                            data.timeByGroup.push(newTime.createGroupTime);
                                            await store.writeQuery({
                                                query: timeByGroup,
                                                variables: {group: selectedGroup},
                                                data: data
                                            });
                                        }
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
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}
export default GroupTaskTimeModalForm;