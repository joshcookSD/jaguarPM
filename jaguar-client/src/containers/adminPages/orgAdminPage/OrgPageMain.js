import React, {Component} from 'react';
import OrgNavTabs from './TemplateComponents/OrgNavTabs.js';
import OrgPagePanes from "./TemplateComponents/OrgPagePanes";
import { Query } from "react-apollo";
import decode from "jwt-decode";
import gql from "graphql-tag";


export const getOrgByOwner = gql`
    query getOrgByOwner($owner: String ){
    getOrgByOwner(owner: $owner ){
          _id
      orgtitle
      orgdescription
    	users{
        _id
        username
        profileImageUrl
      }
          teams{
            _id
            teamtitle
            teamdescription
             defaultproject{
                _id
                projecttitle
                defaultgroup{
                  grouptitle
                  _id
                }
              }
            organization{
                _id
                orgtitle
              }
              users{
                _id
                username
                profileImageUrl
              }
              projects{
                _id
                projecttitle
              }
              tasks{
                _id
                tasktitle
              }
              groups{
                _id
                grouptitle
                tasks{
                _id
                tasktitle
                }
              }
        }
          owner{
          username
          }
        }
        
}`;


const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;
const variables = { owner: userId };


class OrgPageMain extends Component {
    state = {
        activeView: '',
        isSelected: false,
        teamAdd: false,
        userAdded: false
    };

    handleClick = (org) => {
        this.setState({activeView: org, isSelected: true });
    };

    handleAfterSubmit = (org) => {
        this.setState({activeView: org, teamAdd: true, isSelected: false});
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
                                    data={data.getOrgByOwner}
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