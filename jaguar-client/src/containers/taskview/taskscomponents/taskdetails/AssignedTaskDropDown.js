import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react';
import { userTaskDetails } from '../../TaskView';


const updateTaskUser = gql`
mutation updateTaskUser($_id: String, $taskcurrentowner: String) {
    updateTaskUser(_id: $_id, taskcurrentowner: $taskcurrentowner) {
        _id
        team {
            _id
            teamtitle
        }
        project {
            _id
            projecttitle
        }
        taskcurrentowner {
            _id
            username
        }
        }
    }
`;

class AssignedTaskDropDown extends Component {

    _updateTaskAssigned = async ( store, updateTask, option) => {
        const { task } = store.readQuery({query: this.props.query, variables: this.props.queryVariables});
        const { user } = store.readQuery({query: userTaskDetails, variables: {_id: this.props.userId}});
        const removedTasks = await user.tasks.filter(task => {
            return task._id != this.props.taskId;
        });
        user.tasks = removedTasks;
        task.taskcurrentowner = option;
        console.log(task);
        await store.writeQuery({
            query: this.props.query,
            variables: this.props.queryVariables,
            data: { task }
        });
        await store.writeQuery({
            query: userTaskDetails,
            variables:  {_id: this.props.userId},
            data: { user }
        });
    };

    _updateTaskAssignedCurrent = async ( store, updateTask, option) => {
        const { task } = store.readQuery({query: this.props.query, variables: this.props.queryVariables});
        const { user } = store.readQuery({query: userTaskDetails, variables: {_id: this.props.userId}});
        task.taskcurrentowner = option;
        user.tasks.push(task);
        console.log(task);
        await store.writeQuery({
            query: this.props.query,
            variables: this.props.queryVariables,
            data: { task }
        });
        await store.writeQuery({
            query: userTaskDetails,
            variables:  {_id: this.props.userId},
            data: { user }
        });
    };

    render() {
        const {
            userOptions,
            taskId,
            userDetails,
            userId
        } = this.props;

        return (
                <div className="dropDownDiv">
                    <Mutation mutation={updateTaskUser}>
                        {(updateTask, { data }) => (
                            <Dropdown text={userDetails? userDetails.username : 'unassigned'} fluid scrolling floating labeled button className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header content='Assign to' />
                                    {userOptions.map((option, i) =>
                                        <Dropdown.Item
                                            key={i}
                                            text={option.username}
                                            value={option._id}
                                            {...option}
                                            onClick={async e => {
                                                e.preventDefault();
                                                await updateTask({
                                                    variables: {
                                                        _id: taskId,
                                                        taskcurrentowner: option._id
                                                    },
                                                    update: async (store, {data: {updateTaskUser}}) => {
                                                        option._id === userId ? this._updateTaskAssignedCurrent(store, updateTaskUser, option) : this._updateTaskAssigned(store, updateTaskUser, option);
                                                    }
                                                });
                                                this.props.closeAssigned();
                                                this.props.openDetail();
                                            }}
                                        />)}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Mutation>
                </div>
        );
    }
}


export default AssignedTaskDropDown