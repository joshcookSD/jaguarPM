import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import { updateProject } from '../../apollo-graphql/groupProjectQueries.js';
import { teamsByOrg } from '../../apollo-graphql/teamOrgQueries.js';
import decode from "jwt-decode";
import {userTeamProjects} from "../../apollo-graphql/groupProjectQueries";

class ProjectTeamDropDown extends Component {

    render() {
        const {
            projectDetails,
            queryVariables,
            selectedProject,
            orgIdForDropDown,
            projectsTeamId,
            projectsGroupIds,
            closeDropDown
        } = this.props;

        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const variables = {_id: user._id};

        return (
            <Query query={teamsByOrg} variables={{organization: orgIdForDropDown}}>
                {({ loading, error, data }) => {
                    let teamOptions = (data.teamsByOrg|| []).map(team => ({ text: team.teamtitle, _id: team._id }));
                    return (
                        <div className="dropDownDiv">
                            <Mutation mutation={updateProject}>
                                {(updateProject, { data }) => (
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
                                                        await updateProject({
                                                            variables: {
                                                                targetTeam: option._id,
                                                                projectToChange: selectedProject,
                                                                projectsGroupIds: projectsGroupIds.toString(),
                                                                projectsTeamId: projectsTeamId
                                                            },
                                                            refetchQueries: [
                                                                { query: userTeamProjects, variables: variables },
                                                                { query: projectDetails, variables: queryVariables },
                                                            ]
                                                        });
                                                        await closeDropDown();
                                                        this.props.removeProjectSwitchForDefault();
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


export default ProjectTeamDropDown