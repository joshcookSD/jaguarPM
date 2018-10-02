import React, {Component} from 'react';
import { Header, Dimmer, Loader, Progress } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const groupGroups = gql`
query group($_id: String ){
    group(_id: $_id){     
        _id
        tasks{
            _id
            iscompleted
        }
    }
}`;

const timeByGroup = gql`
 query timeByGroup($group: String!){
      timeByGroup(group: $group) {
           _id
            time
        }
 }
 `;

const plannedtimebygroup = gql`
 query plannedtimebygroup($group: String!){
      plannedtimebygroup(group: $group) {
           _id
            time
        }
 }
 `;



class GroupTimeBarCharts extends Component {

    render () {
        const {selectedGroup} = this.props;

        return (
            <Query query={groupGroups} variables={{_id: selectedGroup }}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    if (error) return <p>No Group Selected</p>;
                    let allTasks = data.group.tasks.length;
                    let completedTasks = ((data.group.tasks || []).filter(task => task.iscompleted === true).length);
                    return (
                        <Query query={timeByGroup} variables={{group: selectedGroup }}>
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
                                return (
                                    <Query query={plannedtimebygroup} variables={{group: selectedGroup }}>
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
                                                <div>
                                                    <Header as='h3'>Time Used</Header>
                                                    <Progress value={ workedHours } total={totalPlannedGroupTime} progress='ratio' />

                                                    <Header as='h3'>Tasks Completed</Header>
                                                    <Progress value={completedTasks} total={allTasks} progress='ratio' />
                                                </div>
                                            )
                                        }}
                                    </Query>
                                )
                            }}
                        </Query>
                    )
                }}
            </Query>
        )
    }
}

export default GroupTimeBarCharts;