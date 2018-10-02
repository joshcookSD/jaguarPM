import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const updateTaskPlanDate = gql`
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

class PlanDateForm extends Component {
    state ={
        planDateInput: '',
    };

    _updatePlanDate = async (e, updateTask) => {
        await this.setState({planDateInput: e.target.value});-
        await updateTask({
            variables: {
                _id: this.props.task._id,
                tasktitle: this.props.task.tasktitle,
                taskdescription: this.props.task.taskdescription,
                iscompleted: this.props.task.iscompleted,
                plandate: this.state.planDateInput,
                duedate: this.props.task.duedate,
                taskGroupId: this.props.task.group
            },
            update: async (store, {data: {updateTaskPlanDate}}) => {
                const {task} = store.readQuery({
                    query: this.props.query,
                    variables: this.props.variables
                });
                task.plandate = this.state.planDateInput;
                await store.writeQuery({
                    query: this.props.query,
                    variables: this.props.variables,
                    data: {task}
                });
            }
        });
        this.props.closePlanDate();
    };

    render() {
        const { planDateInput } = this.state;

        return (
            <Mutation mutation={updateTaskPlanDate}>
                {(updateTask, { data }) => (
                    <input
                        type='date'
                        value={planDateInput}
                        onChange={ e => this._updatePlanDate(e, updateTask) }
                    />
                )}
            </Mutation>
        )
    }
}

export default PlanDateForm