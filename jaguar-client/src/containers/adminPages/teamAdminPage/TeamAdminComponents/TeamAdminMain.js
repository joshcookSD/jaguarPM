import React, {Component} from 'react';
import TeamAdminPageNavTabs from './TeamAdminPageNavTabs.js';
import TeamAdminPagePanes from "./TeamAdminPagePanes";
import { Query } from "react-apollo";
import decode from "jwt-decode";
import gql from "graphql-tag";

const teamsByOwner = gql`
    query teamsByOwner($owner: String ){
        teamsByOwner( owner: $owner ){
               _id
            teamtitle
            teamdescription
            owner{
             username
            }
            defaultproject {
              _id
              projecttitle
            }
            users{
              _id
              username
              profileImageUrl
            }
            projects{
              _id
              projecttitle
              projectdescription
              iscompleted
              users{
                _id
              }
              projecttime{
                _id
              }
              projectplannedtime{
                _id
              }
              team{
                _id
              }
              tasks{
                      _id
                      tasktitle
                      taskdescription
                      tasktime{
                        _id
                      }
                      taskplannedtime{
                        _id
                      }
                      tasktime{
                        _id
                      }
                      comments{
                        _id
                      }
                    }
                groups{
                  _id
                  grouptitle
                  groupdescription
                  iscompleted
                  grouptime{
                    _id
                  }
                  comments{
                    _id
                  }
                  groupplannedtime{
                    _id
                  }
                  grouptime{
                    _id
                  }
                    users{
                      _id
                      username
                    }
                    tasks{
                      _id
                      tasktitle
                      taskdescription
                      tasktime{
                        _id
                      }
                      taskplannedtime{
                        _id
                      }
                      tasktime{
                        _id
                      }
                      comments{
                        _id
                      }
                    }
                  }
                }
            tasks{
              _id
              tasktitle
              taskdescription
              iscompleted
              priority{
              priority
              }
            }
        }
    }`;


const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;
const variables = { owner: userId };

class TeamAdminMain extends Component {
    state = {
        activeView: '',
        isSelected: false,
        projectAdd: false,
    };
    handleClick = (team) => {
        this.setState({activeView: team, isSelected: true });
    };
    handleAfterSubmit = (team) => {
        this.setState({activeView: team, projectAdd: true, isSelected: false});
    };
    render() {
        const { activeView, isSelected } = this.state;
        return (
            <Query query={teamsByOwner} variables={variables}>
                {({ loading, error, data }) => {
                    if(this.state.isSelected === false ) {
                        (data.teamsByOwner || []).forEach((team, i) => {
                            if (i === 0) {
                                this.setState({activeView: team, isSelected: true})
                            }
                        });
                    }
                    return (
                        <div>
                            <TeamAdminPageNavTabs
                                changeView={this.handleClick}
                                activeView={activeView}
                                isSelected={isSelected}
                                data={data}
                                user={this.props.user}
                            />
                            <TeamAdminPagePanes
                                handleAfterSubmit={this.handleAfterSubmit}
                                activeView={activeView}
                                team={data.teamsByOwner}
                                teamsByOwner={teamsByOwner}
                                variables={variables}
                            />
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default TeamAdminMain;