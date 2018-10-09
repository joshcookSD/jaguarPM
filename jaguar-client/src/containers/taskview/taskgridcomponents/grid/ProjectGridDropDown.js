import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'

const updateTaskProject = gql`
mutation updateTaskProject($_id: String, $project: String, $group: String) {
    updateTaskProject(_id: $_id, project: $project, group: $group) {
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

class ProjectTaskDropDown extends Component {

    render() {
        const {
            projectOptions,
            taskId,
            projectDetails,
        } = this.props;

        return (
            <div className="dropDownDiv">
                <Mutation mutation={updateTaskProject}>
                    {(updateTask, { data }) => (
                        <Dropdown text={projectDetails.projecttitle}  fluid icon={null}>
                            <Dropdown.Menu>
                                <Dropdown.Header content='New Project' />
                                {projectOptions.map((option, i) =>
                                    <Dropdown.Item
                                        key={i}
                                        text={option.projecttitle}
                                        value={option._id}
                                        {...option}
                                        onClick={async e => {
                                            e.preventDefault();
                                            await updateTask({
                                                variables: {
                                                    _id: taskId,
                                                    project: option._id,
                                                    group: option.defaultgroup._id
                                                },
                                                update: async (store, {data: {updateTaskProject}}) => {
                                                    const { user } = store.readQuery({query: this.props.query, variables: this.props.variables});
                                                    const projectTask = user.tasks.find(task => task._id === taskId );
                                                    projectTask.project = option;
                                                    projectTask.group = option.defaultgroup;
                                                    user.tasks.map(task => projectTask._id === task._id ? projectTask : task);
                                                    await store.writeQuery({
                                                        query: this.props.query,
                                                        variables: this.props.variables,
                                                        data: { user }
                                                    });
                                                }
                                            });
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


export default ProjectTaskDropDown