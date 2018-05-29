import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader, } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { userTeamProjects} from "../../apollo-graphql/groupProjectQueries";

const token = localStorage.getItem('token');

class UnassignedGroupList extends Component {

    render() {
        const { user } = decode(token);
        const variables = {_id: user._id};
        return(
            <Query query={userTeamProjects} variables={variables}>
                { ({ loading, error, data }) => {
                    {console.log(data)}
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;

                    return  <div>
                        { (data.user.team || []).map( (team, i) => (
                            <div key={i}>*unassigned Group List*</div>
                        )) }

                    </div>;
                }}
            </Query>
        )
    }
}

export default UnassignedGroupList;
