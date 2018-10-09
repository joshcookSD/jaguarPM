import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import GroupGridDropDown from './GroupGridDropDown';

const projectGroups = gql`
    query project($_id: String ){
    project(_id: $_id){     
       _id
       projecttitle
       groups {
         _id
         grouptitle
       } 
    }
}`;

class GroupGridOptions extends Component {

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
                        <div>Are you not Grouped???</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                       <GroupGridDropDown
                           groupOptions={data.project.groups}
                           taskId={taskId}
                           projectId={projectId}
                           query={query}
                           groupDetails={groupDetails}
                           variables={variables}
                       />
                    );
                }}
            </Query >
        );
    }
}


export default GroupGridOptions