import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import AssignedTaskDropDown from './AssignedTaskDropDown'


const teamUsers = gql`
query team($_id: String){
  team(_id: $_id) {
    _id
    users {
      _id
      username
    }
  }
}
`;

class AssignedTaskOptions extends Component {
    render() {
        const {
            taskId,
            teamId,
            userDetails,
            userId
        } = this.props;

        const queryVariables = {_id: teamId};

        return (
            <Query query={teamUsers} variables={queryVariables}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div>who wants this?</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                       <AssignedTaskDropDown
                           userOptions={data.team.users}
                           taskId={taskId}
                           teamId={teamId}
                           userId={userId}
                           userDetails={userDetails}
                           query={this.props.query}
                           queryVariables={this.props.queryVariables}
                           closeAssigned={this.props.closeAssigned}
                           openDetail={this.props.openDetail}
                       />
                    );
                }}
            </Query >
        );
    }
}


export default AssignedTaskOptions