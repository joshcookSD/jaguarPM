import React, {Component} from 'react';
import { graphql } from "react-apollo";
import {createTaskTime} from '../../apollo-graphql/timeQueries';
import { Form, Input, List } from 'semantic-ui-react';
import styled from "styled-components";

const TaskTimeLayout = styled.div`
    background-color: rgb(255,255,255);
    border-radius: .3em;
    display: flex;
    flex-direction: column;
    transition: box-shadow .1s ease;
    box-sizing: inherit;
    font-size: 1rem;
    line-height: 1.15em;
    position: relative;
    padding: .5em 1em;
`;

class TaskTime extends Component {
    state = {
        actualtime: '',
        comment: '',
        plannedtime: '',
        check: false,
    };

    render() {
        const { taskId, userId, date, time, updateQuery, refreshVariables } = this.props;
        const { actualtime, comment, plannedtime } = this.state;
        const _addTime = async () => {
            await this.props.addTime({
                variables: {task: taskId, user: userId, date: date, time: actualtime, timecomment: comment},
                refetchQueries: [{query: updateQuery, variables: refreshVariables}]
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
                <TaskTimeLayout>
                <Form.Group style={{marginBottom: '2px'}} inline>
                <Form.Field width='six'>
                    <Input size='mini'
                        value={actualtime}
                        type='number'
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

                </Form.Group>
                <Form.Group style={{marginBottom: '2px'}} inline>
                    <Form.Field width='six'>
                        <Input size='mini'
                            value={plannedtime}
                            type='number'
                            placeholder='plan'
                            onChange={e => this.setState({plannedtime: e.target.value})}
                        />
                    </Form.Field>
                    <Form.Field width='twelve'>
                    <List.Content>{time} hrs</List.Content>
                    </Form.Field>
                </Form.Group>
                </TaskTimeLayout>
            </Form>
        )
    }
}



export default graphql(createTaskTime,{
    name: 'addTime',
})(TaskTime);