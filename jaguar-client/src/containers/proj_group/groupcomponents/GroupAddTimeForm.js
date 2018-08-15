import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Input, Form, Button, Icon, Dropdown } from 'semantic-ui-react';
import {userTaskDetails} from "../../apollo-graphql/userQueries";
import {createTask} from "../../apollo-graphql/taskQueries";
import {groupDetails, projectDetails, userProjectGroups} from "../../apollo-graphql/groupProjectQueries";


class GroupAddTimeForm extends Component {
    state = {

    };

    render() {
        const {

        } = this.props;

        const {

        } = this.state;

        return (
            <Mutation mutation={createTask}>
                {(createTask, {loading}) => {
                    return (
                        <div >
                            <Form onSubmit={async e => {
                                e.preventDefault();
                                await createTask({
                                    variables: {

                                    },
                                    refetchQueries: [

                                    ]
                                });

                            }} >
                                <Form.Field>
                                    <label>task title</label>
                                    <Input
                                        fluid
                                        // value={}
                                        type='text'
                                        placeholder='add task...'
                                        onChange={e => this.setState({newTaskTitle: e.target.value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>task description</label>
                                    <Input
                                        fluid
                                        // value={}
                                        type='text'
                                        placeholder='add task description...'
                                        onChange={e => this.setState({newTaskDescription: e.target.value})}
                                    />
                                </Form.Field>
                                <Button
                                    loading={!!loading}
                                    type='submit'
                                    floated='right'
                                >
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default GroupAddTimeForm;