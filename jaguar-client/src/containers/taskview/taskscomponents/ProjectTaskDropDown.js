import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { updateTaskProject } from '../../apollo-graphql/taskQueries.js';
import { teamProjects } from '../../apollo-graphql/groupProjectQueries';

class ProjectTaskDropDown extends Component {

    render() {
        const {
            taskId,
            teamId,
            query,
            projectDetails,
            variables,
        } = this.props;

        const queryVariables = {_id: teamId};

        return (
            <Query query={teamProjects} variables={queryVariables}>
                {({ loading, error, data }) => {
                    console.log(data);
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    let projectOptions = (data.team.projects || []).map(project => ({ text: project.projecttitle, _id: project._id, defaultgroup: project.defaultgroup._id}));
                    return (
                        <div className="dropDownDiv">
                            <Mutation mutation={updateTaskProject}>
                                {(updateTask, { data }) => (
                                    <Dropdown text={projectDetails.projecttitle}  fluid scrolling floating labeled button className='icon'>
                                        <Dropdown.Menu>
                                            <Dropdown.Header content='New Project' />
                                            {projectOptions.map((option, i) =>
                                                <Dropdown.Item
                                                    key={i}
                                                    value={option._id}
                                                    {...option}
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        this.props.closeProject();
                                                        await updateTask({
                                                            variables: { _id: taskId, project: option._id, group: option.defaultgroup },
                                                            refetchQueries: [{ query: query, variables: variables }]
                                                        });
                                                    }}
                                                />)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </Mutation>
                        </div>
                    );
                }}
            </Query >
        );
    }
}


export default ProjectTaskDropDown