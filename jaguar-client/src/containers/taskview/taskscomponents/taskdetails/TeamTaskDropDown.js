import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { updateTaskTeam } from '../../../apollo-graphql/taskQueries.js';
import { userTeams } from '../../../apollo-graphql/userQueries.js';

class TeamTaskDropDown extends Component {

    render() {
        const {
            taskId,
            userId,
            query,
            teamDetails,
            variables,
        } = this.props;

        const queryVariables = {_id: userId};

        return (
            <Query query={userTeams} variables={queryVariables}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    let teamOptions = (data.user.team || []).map(team => ({ text: team.teamtitle, _id: team._id, defaultproject: team.defaultproject._id, defaultgroup: team.defaultproject.defaultgroup._id }));
                    return (
                        <div className="dropDownDiv">
                            <Mutation mutation={updateTaskTeam}>
                                {(updateTask, { data }) => (
                                    <Dropdown text={teamDetails.teamtitle}  fluid scrolling floating labeled button className='icon'>
                                        <Dropdown.Menu>
                                            <Dropdown.Header content='New Team' />
                                            {teamOptions.map((option, i) =>
                                                <Dropdown.Item
                                                    key={i}
                                                    value={option._id}
                                                    {...option}
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        this.props.closeTeam();
                                                        await updateTask({
                                                            variables: { _id: taskId, team: option._id, project: option.defaultproject, group: option.defaultgroup },
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


export default TeamTaskDropDown