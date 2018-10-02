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

const timeByGroup = gql`
 query timeByGroup($group: String!){
      timeByGroup(group: $group) {
           _id
            time
        }
 }
 `;

class GroupTotalPlannedRemainingCard extends Component {
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
                    if (error) return <p>No Group Selected</p>;
                    let totalPlannedGroupTime = data.plannedtimebygroup.map(ptp => ptp.time).reduce((x, y) => x + y, 0);
                    return (
                        <Query query={timeByGroup} variables={this.props.variables}>
                            { ({ loading, error, data }) => {
                                if (loading) return (
                                    <div>
                                        <Dimmer active>
                                            <Loader/>
                                        </Dimmer>
                                    </div>
                                );
                                if (error) return <p>No Group Selected</p>;
                                const workedHours = data.timeByGroup.map(time => time.time).reduce((x, y) => x + y, 0);
                                let groupHoursLeft = totalPlannedGroupTime - workedHours;
                                return (
                                    <Card>
                                        <Card.Content textAlign='center'>
                                            <Card.Header>total hours left</Card.Header>
                                            <Card.Description>
                                                <Header as='h2'>{groupHoursLeft < 0 ? 0 : groupHoursLeft}</Header>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                )
                            }}
                        </Query>
                    )
                }}
            </Query>
        )
    }
}

export default GroupTotalPlannedRemainingCard;