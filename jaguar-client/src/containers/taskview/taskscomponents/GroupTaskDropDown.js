import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { updateTaskGroup } from '../../apollo-graphql/taskQueries.js';
import { projectGroups } from '../../apollo-graphql/groupProjectQueries';

class GroupTaskDropDown extends Component {

    render() {
        const {
            taskId,
            projectId,
            query,
            groupDetails,
            variables,
        } = this.props;

        const queryVariables = {_id: projectId};

        return (
            <Query query={projectGroups} variables={queryVariables}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    let groupOptions = (data.project.groups || []).map(group => ({ text: group.grouptitle, _id: group._id}));
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
                                                    value={option._id}
                                                    {...option}
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        await updateTask({
                                                            variables: { _id: taskId, group: option._id },
                                                            refetchQueries: [{ query: query, variables: variables }]
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
                }}
            </Query >
        );
    }
}


export default GroupTaskDropDown