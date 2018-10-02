import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';

const removeTask = gql`
mutation removeTask($_id: String!) {
    removeTask(_id: $_id) {
        _id
        }
    }
`;

class RemoveTask extends Component {

    _removeTaskUser = async (store, removeTask) => {
        const { user } = store.readQuery({query: this.props.updateQuery, variables: this.props.refreshVariables});
        const removedTasks = await user.tasks.filter(task => {
            return task._id != this.props.taskId;
        });
        user.tasks = removedTasks;
        await store.writeQuery({
            query: this.props.updateQuery,
            variables: this.props.refreshVariables,
            data: { user }
        });
        this.props.openDetail();
    };

    _removeTaskTeam = async (store, removeTask) => {
        const { team } = store.readQuery({query: this.props.updateQuery, variables: this.props.refreshVariables});
        const removedTasks = team.tasks.filter(task => {
            return task._id !== this.props.taskId;
        });
        team.tasks = removedTasks;
        await store.writeQuery({
            query: this.props.updateQuery,
            variables: this.props.refreshVariables,
            data: { team }
        });
        this.props.openDetail();
    };

    render() {

        return (
            <Mutation mutation={removeTask} >
                {(removeTask) => {
                    return (
                        <Button
                            size='small'
                            basic color='red'
                            onClick={() => removeTask(
                                {
                                    variables: {
                                        _id: this.props.taskId
                                    },
                                    update: async (store, {data: {removeTask}}) =>{
                                        this.props.queryType === 'user' ? this._removeTaskUser(store, removeTask) : this._removeTaskTeam(store, removeTask);
                                    }
                                }
                            )} >
                            remove
                        </Button>
                    )
                }}
            </Mutation>
        );
    }
}

export default RemoveTask;