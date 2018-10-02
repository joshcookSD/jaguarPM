import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'

const updateTaskGroup = gql`
mutation updateTaskGroup($_id: String, $group: String) {
    updateTaskGroup(_id: $_id, group: $group) {
        _id
        team {
            _id
            teamtitle
        }
        project {
            _id
            projecttitle
        }
        group {
            _id
            grouptitle
        }
        }
    }
`;

class GroupTaskDropDown extends Component {

    render() {
        const {
            groupOptions,
            taskId,
            groupDetails,
        } = this.props;

        return (
            <div className="dropDownDiv">
                <Mutation mutation={updateTaskGroup}>
                    {(updateTask, { data }) => (
                        <Dropdown text={groupDetails.grouptitle} fluid scrolling floating labeled button className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Header content='New Group' />
                                {groupOptions.map((option, i) =>
                                    <Dropdown.Item
                                        key={i}
                                        text={option.grouptitle}
                                        value={option._id}
                                        {...option}
                                        onClick={async e => {
                                            e.preventDefault();
                                            await updateTask({
                                                variables: {
                                                    _id: taskId,
                                                    group: option._id
                                                },
                                                update: async (store, {data: {updateTaskGroup}}) => {
                                                    const { task } = store.readQuery({query: this.props.query, variables: this.props.variables});
                                                    task.group = option;
                                                    await store.writeQuery({
                                                        query: this.props.query,
                                                        variables: this.props.variables,
                                                        data: { task }
                                                    });
                                                }
                                            });
                                            this.props.closeGroup()
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


export default GroupTaskDropDown