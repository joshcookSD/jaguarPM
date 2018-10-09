import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import TeamGridDropDown from './TeamGridDropDown'

const userTeams = gql`
query user($_id: String ){
    user(_id: $_id){
        team {
            _id
            teamtitle
            users {
                _id
                username  
            }
            projects {
                _id
                projecttitle
                groups {
                  _id
                  grouptitle
                }
            }
            defaultproject {
                _id
                projecttitle
                defaultgroup {
                    _id
                    grouptitle
                }
            }
        }
    }
}`;


class TeamTaskOptions extends Component {

    render() {
        const {
            taskId,
            userId,
            teamDetails,
            updateQuery,
            refreshVariables
        } = this.props;

        const queryVariables = {_id: userId};

        return (
            <Query query={userTeams} variables={queryVariables}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div>team..what!</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                    <TeamGridDropDown
                        options={data.user.team}
                        taskId={taskId}
                        userId={userId}
                        teamDetails={teamDetails}
                        updateQuery={updateQuery}
                        refreshVariables={refreshVariables}
                        />
                    )
                }}
            </Query >
        );
    }
}


export default TeamTaskOptions