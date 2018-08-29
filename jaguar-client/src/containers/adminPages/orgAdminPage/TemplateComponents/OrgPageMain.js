import React, {Component} from 'react';
import OrgNavTabs from './OrgNavTabs.js';
import OrgPagePanes from "./OrgPagePanes";
import {getOrgByOwner} from "../../../apollo-graphql/userQueries";
import { Query } from "react-apollo";
import decode from "jwt-decode";


const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;
const variables = { owner: userId };


class OrgPageMain extends Component {
    state = {
        activeView: '',
        isSelected: false,
        teamAdd: false,
    };

    handleClick = (org) => {
        this.setState({activeView: org, isSelected: true });
    };

    handleAfterSubmit = (org) => {
        this.setState({activeView: org, teamAdd: true});
    };

    render() {
        const { activeView, isSelected } = this.state;

        return (
            <Query query={getOrgByOwner} variables={variables}>
                {({ loading, error, data }) => {
                    if(this.state.isSelected === false ) {
                        (data.getOrgByOwner || []).forEach((org, i) => {
                            if (i === 0) {
                                this.setState({activeView: org, isSelected: true})
                            }
                        });
                    }
                    return (
                        <div>
                            <OrgNavTabs
                                changeView={this.handleClick}
                                activeView={activeView}
                                isSelected={isSelected}
                                data={data}
                                user={this.props.user}
                            />
                                <OrgPagePanes
                                    handleAfterSubmit={this.handleAfterSubmit}
                                    activeView={activeView}
                                    org={data.getOrgByOwner}
                                    getOrgByOwner={getOrgByOwner}
                                    variables={variables}
                                />
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default OrgPageMain;