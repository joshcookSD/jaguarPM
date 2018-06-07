import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { updateTaskUser } from '../../apollo-graphql/taskQueries.js';
import { teamUsers } from '../../apollo-graphql/teamOrgQueries';

class GroupTaskDropDown extends Component {
    render() {
        const {
            taskId,
            teamId,
            query,
            userDetails,
            variables,
        } = this.props;

        const queryVariables = {_id: teamId};

        return (
            <Query query={teamUsers} variables={queryVariables}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    let userOptions = (data.team.users || []).map(user => ({ text: user.username, _id: user._id}));
                    return (
                        <div className="dropDownDiv">
                            <Mutation mutation={updateTaskUser}>
                                {(updateTask, { data }) => (
                                    <Dropdown text={userDetails.username} fluid scrolling floating labeled button className='icon'>
                                        <Dropdown.Menu>
                                            <Dropdown.Header content='Assign to' />
                                            {userOptions.map((option, i) =>
                                                <Dropdown.Item
                                                    key={i}
                                                    value={option._id}
                                                    {...option}
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        await updateTask({
                                                            variables: { _id: taskId, taskcurrentowner: option._id },
                                                            refetchQueries: [{ query: query, variables: variables }]
                                                        });
                                                        this.props.closeAssigned();
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