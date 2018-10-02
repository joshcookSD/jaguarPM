import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import GroupTaskDropDown from './GroupTaskDropDown';

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

class GroupTaskOptions extends Component {

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
                       <GroupTaskDropDown
                           groupOptions={data.project.groups}
                           taskId={taskId}
                           projectId={projectId}
                           query={query}
                           groupDetails={groupDetails}
                           variables={variables}
                           closeGroup={this.props.closeGroup}
                       />
                    );
                }}
            </Query >
        );
    }
}


export default GroupTaskOptions