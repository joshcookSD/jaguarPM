import React, {Component} from 'react';
import { Header, Dimmer, Loader, Progress } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const projectGroups = gql`
    query project($_id: String ){
    project(_id: $_id){     
       _id
       projecttitle
       groups{
        _id
        iscompleted
        tasks{
        _id
        iscompleted
       }
       }
       tasks{
        _id
        iscompleted
       }
    }
}`;

const timeByProject = gql`
 query timeByProject($project: String!){
      timeByProject(project: $project) {
           _id
            time
        }
 }
 `;

const plannedtimebyproject = gql`
 query plannedtimebyproject($project: String!){
      plannedtimebyproject(project: $project) {
           _id
            time
        }
 }
 `;



class ProjectTimeBarCharts extends Component {

    render () {
        return (
            <Query query={projectGroups} variables={this.props.variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    if (error) return <p>No Project Selected</p>;
                    let groupsCompleted = (((data.project.groups || []).filter(group => group.iscompleted === true).length));
                    let groupTotal = data.project.groups.length;
                    let allTasks = ((data.project.groups || []).map(group => group.tasks.length).reduce((x, y) => x + y, 0));
                    let completedTasks = ((data.project.groups || []).map(group => group.tasks.filter(task => task.iscompleted === true).length).reduce((x, y) => x + y, 0))
                    return (
                        <Query query={timeByProject} variables={this.props.variablesForTime}>
                            { ({ loading, error, data }) => {
                                if (loading) return (
                                    <div>
                                        <Dimmer active>
                                            <Loader/>
                                        </Dimmer>
                                    </div>
                                );
                                if (error) return <p>No Project Selected</p>;
                                const workedHours = data.timeByProject.map(time => time.time).reduce((x, y) => x + y, 0);
                                return (
                                    <Query query={plannedtimebyproject} variables={this.props.variablesForTime}>
                                        { ({ loading, error, data }) => {
                                            if (loading) return (
                                                <div>
                                                    <Dimmer active>
                                                        <Loader/>
                                                    </Dimmer>
                                                </div>
                                            );
                                            if (error) return <p>No Project Selected</p>;
                                            let totalPlannedProjectTime = data.plannedtimebyproject.map(ptp => ptp.time).reduce((x, y) => x + y, 0);
                                            return (
                                                <div>
                                                    <Header as='h3'>Groups Completed</Header>
                                                    <Progress value={groupsCompleted} total={groupTotal} progress='ratio' />

                                                    <Header as='h3'>Time Used</Header>
                                                    <Progress value={ workedHours } total={totalPlannedProjectTime} progress='ratio' />

                                                    <Header as='h3'>All Tasks Completed</Header>
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

export default ProjectTimeBarCharts;