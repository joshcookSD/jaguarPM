import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const updateTaskDueDate = gql`
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

class DueDateForm extends Component {
    state ={
        dueDateInput: '',
    };

    _updateDueDate = async (e, updateTask) => {
        await this.setState({dueDateInput: e.target.value});
        await updateTask({
            variables: {
                _id: this.props.task._id,
                tasktitle: this.props.task.tasktitle,
                taskdescription: this.props.task.taskdescription,
                iscompleted: this.props.task.iscompleted,
                plandate: this.props.task.plandate,
                duedate: this.state.dueDateInput,
                taskGroupId: this.props.task.group
            },
            update: async (store, {data: {updateTaskDueDate}}) => {
                const {task} = store.readQuery({
                    query: this.props.query,
                    variables: this.props.variables
                });
                task.duedate = this.state.dueDateInput;
                await store.writeQuery({
                    query: this.props.query,
                    variables: this.props.variables,
                    data: {task}
                });
            }
        });
        this.props.closeDueDate();
    };

    render() {
        const { dueDateInput } = this.state;

        return (
            <Mutation mutation={updateTaskDueDate}>
                {(updateTask, { data }) => (
                    <input
                        type='date'
                        value={dueDateInput}
                        onChange={ e => this._updateDueDate(e, updateTask) }
                    />
                )}
            </Mutation>
        )
    }
}

export default DueDateForm