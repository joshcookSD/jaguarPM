import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import ProjectGridDropDown from "./ProjectGridDropDown";

const teamProjects = gql`
    query team($_id: String ){
    team(_id: $_id){     
       _id
       teamtitle
       projects {
         _id
         projecttitle
         defaultgroup {
             _id
             grouptitle
         }
       } 
    }
}`;

class ProjectGridOptions extends Component {

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
                    if (loading) return (
                        <div>so many projects...</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                           <ProjectGridDropDown
                               projectOptions={data.team.projects}
                               taskId={taskId}
                               teamId={teamId}
                               query={query}
                               projectDetails={projectDetails}
                               variables={variables}
                           />
                    );
                }}
            </Query >
        );
    }
}


export default ProjectGridOptions