import React, {Component} from 'react';
import TeamAdminPageNavTabs from './TeamAdminPageNavTabs.js';
import TeamAdminPagePanes from "./TeamAdminPagePanes";
import { teamsByOwner } from "../../../apollo-graphql/userQueries";
import { Query } from "react-apollo";
import decode from "jwt-decode";

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
        this.setState({activeView: team, projectAdd: true});
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