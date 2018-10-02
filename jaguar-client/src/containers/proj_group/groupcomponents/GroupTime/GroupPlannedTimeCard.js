import React, {Component} from 'react';
import { Card,  Header, Dimmer, Loader, } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const plannedtimebygroup = gql`
 query plannedtimebygroup($group: String!){
      plannedtimebygroup(group: $group) {
           _id
            time
        }
 }
 `;

class ProjectPlannedTimeCard extends Component {
    render () {
        return (
            <Query query={plannedtimebygroup} variables={this.props.variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    if (error) return <p>No Project Selected</p>;

                    let totalPlannedProjectTime = data.plannedtimebygroup.map(ptp => ptp.time).reduce((x, y) => x + y, 0);

                    return (
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header>total time planned</Card.Header>
                                <Card.Description>
                                    <Header as='h2'>{totalPlannedProjectTime}</Header>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                }}
            </Query>
        )
    }
}

export default ProjectPlannedTimeCard;