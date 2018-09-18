import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import {Dropdown} from 'semantic-ui-react';

const groupOptions = gql`
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


class GroupTimeDropdown extends Component {
    state = {
        update: false
    };

    render() {
        const { project, timeGroup} = this.props;
        const _selectGroup = (group) => {
            this.setState({selectedGroup: group});
            this.props.selectGroup(group);
        };


        return(
            <Query query={groupOptions} variables={{_id: project._id}}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>loading...</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                        <Dropdown text={timeGroup.grouptitle}  fluid scrolling floating labeled button className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Header content='Group' />
                                {(data.project.groups || []).map((option, i) =>
                                    <Dropdown.Item
                                        key={i}
                                        value={option._id}
                                        text={option.grouptitle}
                                        {...option}
                                        onClick={() => {
                                            _selectGroup(option);
                                        }}
                                    />)}
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                }
                }
            </Query>
        )
    }
}

export default GroupTimeDropdown;