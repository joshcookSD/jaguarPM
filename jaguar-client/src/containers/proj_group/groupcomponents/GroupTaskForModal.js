import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Input, Form, Button, Icon, Dropdown } from 'semantic-ui-react';
import {userTaskDetails} from "../../apollo-graphql/userQueries";
import {createTask} from "../../apollo-graphql/taskQueries";
import {groupDetails, projectDetails, userProjectGroups} from "../../apollo-graphql/groupProjectQueries";


class TaskForm extends Component {
    state = {
        newTaskTitle: "",
        newTaskDescription: "",
        plandate: "",
        duedate: '',
        newTaskComment: "",
        tasksBeenAdded: false,
        selectedAssignee: '',
        selectedAssigneeName: ''
    };

    render() {
        const {
            taskcurrentowner,
            group,
            project,
            team,
            teamUsers,
            userName,
            queryVariables
        } = this.props;

        const {
            newTaskTitle,
            newTaskDescription,
            plandate,
            duedate,
            tasksBeenAdded,
            selectedAssignee,
            selectedAssigneeName
        } = this.state;

        const currentOwner =  selectedAssignee ? selectedAssignee : taskcurrentowner;
        const currentOwnerName =  selectedAssigneeName ? selectedAssigneeName : userName;

        return (
            <Mutation mutation={createTask}>
                {(createTask, {loading}) => {
                    return (
                        <div >
                            <Form onSubmit={async e => {
                                    e.preventDefault();
                                    await createTask({
                                        variables: {
                                            tasktitle: newTaskTitle,
                                            newTaskDescription,
                                            taskcurrentowner: currentOwner,
                                            iscompleted: false,
                                            dueDate:duedate ,
                                            plandate,
                                            group: group,
                                            project: project,
                                            team: team,
                                        },
                                        refetchQueries: [
                                            { query: groupDetails, variables: {_id: group}},
                                            // { query: userProjectGroups, variables: {_id: taskcurrentowner}},
                                            { query: userTaskDetails, variables: {_id: taskcurrentowner}},
                                            // { query: projectDetails, variables: {_id: project}},

                                        ]
                                    });
                                    this.setState({newTaskTitle: ""});
                                    this.setState({newTaskDescription: ""});
                                    this.setState({newTaskComment: ""});
                                    this.setState({plandate: ""});
                                    this.setState({duedate: ""});
                                    this.setState({tasksBeenAdded: true});
                                    this.setState({selectedAssignee: ""});
                                }} >
                                <Form.Field>
                                    <label>task title</label>
                                        <Input
                                        fluid
                                        value={newTaskTitle}
                                        type='text'
                                        placeholder='add task...'
                                        onChange={e => this.setState({newTaskTitle: e.target.value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>task description</label>
                                        <Input
                                        fluid
                                        value={newTaskDescription}
                                        type='text'
                                        placeholder='add task description...'
                                        onChange={e => this.setState({newTaskDescription: e.target.value})}
                                    />
                                </Form.Field>
                                <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>plane date</label>
                                        <Input
                                        fluid
                                        type='date'
                                        onChange={e => this.setState({plandate: e.target.value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>due date</label>
                                        <Input
                                            fluid
                                            type='date'
                                            onChange={e => this.setState({duedate: e.target.value})}
                                        />
                                </Form.Field>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>assign to user</label>
                                        <Dropdown text={currentOwnerName} scrolling floating labeled button className='icon'>
                                            <Dropdown.Menu>
                                                <Dropdown.Header content='Assign to' />
                                                {teamUsers.map((option, i) =>
                                                    <Dropdown.Item
                                                        key={i}
                                                        value={option._id}
                                                        selection
                                                        {...option}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            this.setState({selectedAssignee: option._id});
                                                            this.setState({selectedAssigneeName: option.text});
                                                        }}
                                                    />
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Button
                                        loading={!!loading}
                                        type='submit'
                                        floated='right'
                                    >
                                        Submit
                                    </Button>
                                        {
                                            (newTaskTitle) ? <div /> : ( tasksBeenAdded ? <div style={{'display' : 'flex', 'justifyContent' : 'flex-end'}}>
                                                    <Icon name='check' color='green' /> Task Has Been Added
                                                </div> : <div /> )
                                        }
                                    </Form.Field>
                                </Form.Group>

                                <Form.Field />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default TaskForm;