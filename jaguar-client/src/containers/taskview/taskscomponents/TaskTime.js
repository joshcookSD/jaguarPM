import React, {Component} from 'react';
import { graphql } from "react-apollo";
import {createTaskTime} from '../../apollo-graphql/timeQueries';
import { Form, Input } from 'semantic-ui-react';

class TaskTime extends Component {
    state = {
        time: '',
        comment: '',
        check: false,
    };

    render() {
        const { taskId, userId, date } = this.props;
        const { time, comment } = this.state;
        const _addTime = async () => {
            await this.props.addTime({
                variables: {task: taskId, user: userId, date: date, time, timecomment: comment}
            });
            this.setState({time: '', comment: ''});
            this.props.closeTime();
        };
        return(
            <Form
                  onSubmit={async e => {
                e.preventDefault();
                await _addTime();
            }}>
                <Form.Group style={{marginBottom: '2px'}} inline>
                <Form.Field width='six'>
                    <Input
                        value={time}
                        type='number'
                        placeholder='time'
                        onChange={e => this.setState({time: e.target.value})}
                    />
                </Form.Field>
                <Form.Field width='twelve'>
                    <Input
                        value={comment}
                        type='text'
                        placeholder='comment'
                        action={{icon: 'add circle'}}
                        onChange={e => this.setState({comment: e.target.value})}
                    />
                </Form.Field>

                </Form.Group>
            </Form>
        )
    }
}



export default graphql(createTaskTime,{
    name: 'addTime',
})(TaskTime);