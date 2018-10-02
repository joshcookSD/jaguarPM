import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import TeamTaskDropDown from './TeamTaskDropDown'

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
        } = this.props;

        const queryVariables = {_id: userId};

        return (
            <Query query={userTeams} variables={queryVariables}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div>team..what!</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                    <TeamTaskDropDown
                        options={data.user.team}
                        taskId={taskId}
                        userId={userId}
                        teamDetails={teamDetails}
                        updateQuery={this.props.updateQuery}
                        refreshVariables={this.props.refreshVariables}
                        closeTeam={this.props.closeTeam}/>
                    )
                }}
            </Query >
        );
    }
}


export default TeamTaskOptions