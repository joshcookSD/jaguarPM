import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import { Input, Form } from 'semantic-ui-react';

const createTask = gql`
mutation createTask($tasktitle: String!, $taskcurrentowner: String, $plandate: Date, $iscompleted: Boolean!, $group:String!, $project:String!, $team: String!, $dueDate: Date ) {
    createTask(tasktitle: $tasktitle, taskcurrentowner: $taskcurrentowner, plandate: $plandate, iscompleted: $iscompleted, group: $group, project: $project, team: $team, dueDate: $dueDate) {
        _id
        tasktitle
        taskdescription
        iscompleted
        plandate
        group {
            _id
        }
        project {
            _id
        }
        team {
            _id
        }
        duedate
        tasktime {
            _id
        }
        taskplannedtime {
            _id
        }
        taskcurrentowner {
          _id
          username
            }
        }
    }
`;

class TaskForm extends Component {
    state = {
        newTask: "",
    };
    _updateTaskUser = async (store, createTask) => {
        const { user } = store.readQuery({query: this.props.updateQuery, variables: this.props.variables});
        createTask.plandate = this.props.plandate;
        user.tasks.push(createTask);
        await store.writeQuery({
            query: this.props.updateQuery,
            variables: this.props.variables,
            data: { user }
        });
    };

    _updateTaskTeam = async (store, createTask) => {
        const { team } = store.readQuery({query: this.props.updateQuery, variables: this.props.variables});
        team.tasks.push(createTask);
        await store.writeQuery({
            query: this.props.updateQuery,
            variables: this.props.variables,
            data: { team }
        });
    };

    render() {
        const {
            taskcurrentowner,
            plandate,
            defaultteam,
            defaultgroup,
            defaultproject,
            queryType
        } = this.props;

        const { newTask } = this.state;

        return (
            <Mutation mutation={createTask} >
                {(createTask) => {
                    return (
                        <div style={{marginBottom: '.1em'}} onClick={() => this.props.clearTask('NA')}>
                            <Form
                                onSubmit={ e => {
                                    e.preventDefault();
                                    createTask({variables: {
                                        tasktitle: newTask,
                                        taskcurrentowner,
                                        iscompleted: false,
                                        plandate,
                                        group: defaultgroup,
                                        project: defaultproject,
                                        team: defaultteam
                                    },

                                    update: async (store, {data: {createTask}}) => {
                                        queryType === 'user' ? this._updateTaskUser(store, createTask) : this._updateTaskTeam(store, createTask);
                                    }
                                    });
                                    this.setState({newTask: ""});
                                }}
                            >
                                <Input
                                    fluid
                                    value={newTask}
                                    type='text'
                                    action={{icon: 'add circle'}}
                                    placeholder='add task...'
                                    onChange={e => this.setState({newTask: e.target.value})}
                                />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default TaskForm;