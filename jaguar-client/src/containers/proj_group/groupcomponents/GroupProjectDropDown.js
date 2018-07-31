import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import { teamsById } from '../../apollo-graphql/teamOrgQueries.js';
import decode from "jwt-decode";
import {updateProject, userTeamProjects} from "../../apollo-graphql/groupProjectQueries";
import {updateGroup} from "../../apollo-graphql/groupProjectQueries";

class GroupProjectDropDown extends Component {

    render() {
        const {
            selectedTeamId,
            selectedGroup,
            groupUsers,
            groupProject,
            groupProjectTeam
        } = this.props;

        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const variables = {_id: user._id};
        console.log(selectedTeamId)

        return (
            <Query query={teamsById} variables={{_id: selectedTeamId}}>
                {({ loading, error, data }) => {
                    console.log(data)
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;
                    const teamOptions = (data.teamsById.projects || []).map(project => ({ text:project.projecttitle, _id: project._id }));
                    return (
                        <div className="dropDownDiv">
                            <Mutation mutation={updateGroup}>
                                {(updateGroup, { data }) => (
                                    <Dropdown text={'change team'}  scrolling floating labeled button className='icon'>
                                        <Dropdown.Menu>
                                            <Dropdown.Header content='New Project Leader' />
                                            {teamOptions.map((option, i) =>
                                                <Dropdown.Item
                                                    key={i}
                                                    value={option._id}
                                                    {...option}
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        await updateGroup({
                                                            variables: {
                                                                targetProject: option._id,
                                                                groupToChange: selectedGroup,
                                                                groupUsers: groupUsers,
                                                                groupTeam: selectedTeamId,
                                                                groupProject: groupProject,
                                                                // groupsProjectTeam: groupProjectTeam
                                                            },
                                                            // refetchQueries: [
                                                            //     { query: userTeamProjects, variables: variables },
                                                            //     { query: projectDetails, variables: queryVariables },
                                                            // ]
                                                        });
                                                        // await closeDropDown();
                                                        // this.props.removeProjectSwitchForDefault();
                                                    }}
                                                />
                                            )}
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


export default GroupProjectDropDown