import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader } from 'semantic-ui-react';
import { teamsByOwner } from "../../apollo-graphql/userQueries";

class UnassignedGroupList extends Component {
    render() {
        const variables = this.props.variables
        return(
            <Query query={teamsByOwner} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return  <div>
                        { (data.teamsByOwner || []).map( (team, i) => (
                            (team.groups || []).map( (group, i) => (
                            <div key={i}>{group.grouptitle}</div>
                            ))
                        )) }
                        </div>
                }}
            </Query>
        )
    }
}

export default UnassignedGroupList;

