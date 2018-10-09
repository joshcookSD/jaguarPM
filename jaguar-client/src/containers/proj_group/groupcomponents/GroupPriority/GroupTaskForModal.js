import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Input, Form, Button, Icon, Dropdown } from 'semantic-ui-react';
import gql from "graphql-tag";

const groupDetails = gql`
query group($_id: String!) {
  group(_id: $_id) {
    _id
    grouptitle
    groupdescription
    tasks {
      _id
      iscompleted
      tasktitle
      taskdescription
          taskplannedtime{
            time
          }
        tasktime{
        time
            user{
            username
                time{
                time
                }
            }
        }
      group{
        _id
        }
      __typename
    }
    __typename
  }
}`;

const createTask = gql`
mutation createTask( $tasktitle: String!, $taskcurrentowner: String, $plandate: Date, $iscompleted: Boolean!, $group:String!, $project:String!, $team: String!, $dueDate: Date, $taskdescription: String ) {
    createTask( tasktitle: $tasktitle, taskcurrentowner: $taskcurrentowner, plandate: $plandate, iscompleted: $iscompleted, group: $group, project: $project, team: $team, dueDate: $dueDate, taskdescription: $taskdescription) {
        group{ _id }
        iscompleted
        taskdescription
        taskplannedtime{ _id }
        tasktime{ _id }
        tasktitle
        _id
    }
}
`;



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
            group,
            project,
            team,
            teamUsers,
            selectedGroup,
            userId
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
                                        taskdescription: newTaskDescription,
                                        taskcurrentowner: userId,
                                        iscompleted: false,
                                        dueDate:duedate ,
                                        plandate,
                                        group: group,
                                        project: project,
                                        team: team,
                                    },
                                    update: async (store, { data: newTask }) => {
                                        let { group } = store.readQuery({query: groupDetails, variables: {_id: selectedGroup}});
                                        group.tasks.push(newTask.createTask);
                                        await store.writeQuery({query: groupDetails, variables: {_id: this.props.selectedGroup}, data: {group}});
                                    }
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
                                        <Dropdown text={selectedAssignee ? selectedAssigneeName : 'choose user'} scrolling floating labeled button className='icon'>
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