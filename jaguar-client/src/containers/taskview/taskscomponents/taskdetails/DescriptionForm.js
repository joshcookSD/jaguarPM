import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import { Form } from 'semantic-ui-react';

const updateTaskDescription = gql`
mutation updateTask($_id: String, $tasktitle: String, $taskdescription: String, $taskcurrentowner: String, $iscompleted: Boolean, $plandate: Date, , $duedate: Date, $taskGroupId: String) {
    updateTask(_id: $_id, tasktitle: $tasktitle, taskdescription: $taskdescription, taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate, duedate: $duedate, taskGroupId: $taskGroupId) {
        _id
        tasktitle
        taskdescription
        plandate
        duedate
        taskcurrentowner {
          _id
          username
            }
        }
    }
`;

class DescriptionForm extends Component {
    state ={
        descriptionInput: this.props.task.taskdescription,
    };

    _updateDescription = async (store, updateTask) => {
        const {task} = store.readQuery({
            query: this.props.query,
            variables: this.props.variables
        });
        task.taskDescription = this.state.descriptionInput;
        await store.writeQuery({
            query: this.props.query,
            variables: this.props.variables,
            data: {task}
        });
        this.props.closeDescription();
    };

    render() {
        const { descriptionInput } = this.state;

        return (
            <Mutation mutation={updateTaskDescription}>
                {(updateTask, { data }) => (
                    <Form onSubmit={async (e) => {
                        e.preventDefault();
                        await updateTask({
                            variables: {
                                _id: this.props.task._id,
                                tasktitle: this.props.task.tasktitle,
                                taskdescription: this.state.descriptionInput,
                                iscompleted: this.props.task.iscompleted,
                                plandate: this.props.task.plandate,
                                duedate: this.props.task.duedate,
                                taskGroupId: this.props.task.group
                            },
                            update: async (store, {data: {updateTaskDueDate}}) => {
                                this._updateDescription(store, updateTaskDueDate)
                            }
                        })
                        }
                    }>
                    <Form.Input
                        fluid
                        placeholder={this.props.task.taskdescription}
                        value={descriptionInput}
                        onChange={ e => this.setState({descriptionInput: e.target.value}) }
                    />
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default DescriptionForm