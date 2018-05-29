
import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import { updateProject } from '../../apollo-graphql/groupProjectQueries.js';





class TeamLeaderDropDown extends Component {

    render() {
        const {
            projectDetails,
            queryVariables,
            selectedProject
        } = this.props;

        return (
            <Query query={projectDetails} variables={queryVariables}>
                {({ loading, error, data }) => {
                   let friendOptions = (data.project.team.users || []).map(user => ({ text: user.username, _id: user._id }))
                   return (
                       <div className="dropDownDiv">
                           <Mutation mutation={updateProject}>
                               {(updateProject, { data }) => (
                                   <Dropdown text={this.props.leader}  scrolling floating labeled button className='icon'>
                                       <Dropdown.Menu>
                                           <Dropdown.Header content='New Project Leader' />
                                           {friendOptions.map((option, i) =>
                                               <Dropdown.Item
                                                   key={i}
                                                   value={option._id}
                                                   {...option}
                                                   onClick={async e => {
                                                       e.preventDefault();
                                                       await updateProject({
                                                           variables: { _id: selectedProject, leader: option._id },
                                                           refetchQueries: [{ query: projectDetails, variables: queryVariables }]
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


export default TeamLeaderDropDown