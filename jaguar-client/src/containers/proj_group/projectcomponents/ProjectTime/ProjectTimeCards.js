import React, {Component} from 'react';
import { Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import ProjectTimeCard from "./ProjectTimeCard";
import ProjectPlannedTimeCard from "./ProjectPlannedTimeCard";
import ProjectTotalPlannedRemainingCard from "./ProjectTotalPlannedRemainingCard";
import ProjectTimeBarCharts from "./ProjectTimeBarCharts";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const projectDetails = gql`
query project($_id: String!) {
    project(_id: $_id) {
        _id
        groups{
            _id
            grouptitle
            groupdescription
            iscompleted
            tasks {
                _id
                iscompleted
                tasktitle
                taskdescription
                taskplannedtime{
                    time
                }
                tasktime{
                time
                    user{
                        username
                        time{
                            time
                        }
                    }
                }
                group{
                    _id
                }
                __typename
            }
        }
    }
}`;


const DropArrowWrapper = styled.div`
display:flex;
justify-content: start;
`;

const TaskListTimeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    background: #e0e1e2;
    border-radius: .28571429rem;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
    cursor: pointer
`;

const UserTimePerTask = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    padding-left: 10%;
    padding-right: 10%;
    cursor: default
`;

class ProjectTimeCards extends Component {

    state = {
        taskTimeDropedDown: false,
        taskTimeDropedDownIndex: '',
        project:'',
        projectId:''
    };


    handleClick = (i) => {
        this.setState({taskTimeDropedDown:!this.state.taskTimeDropedDown});
        this.setState({taskTimeDropedDownIndex:i});
    };
    render () {

        return (
            <Query query={projectDetails} variables={{_id: this.props.selectedProject}}>
                {({loading, error, data}) => {
                    if (error) return <p>No Project Selected</p>;
                    return (
                        <div>
                            <Card.Group itemsPerRow={3}>
                                <ProjectTimeCard variables={{project: this.props.selectedProject}}/>
                                <ProjectPlannedTimeCard variables={{project: this.props.selectedProject}}/>
                                <ProjectTotalPlannedRemainingCard variables={{project: this.props.selectedProject}}/>
                            </Card.Group>
                            <ProjectTimeBarCharts
                                variables={{_id: this.props.selectedProject}}
                                variablesForTime={{project: this.props.selectedProject}}
                            />
                            <div>
                                {
                                    (data.project.groups || []).map((group, i) => ((
                                        <div>
                                            <TaskListTimeWrapper onClick={() => this.handleClick(i)}>
                                                <DropArrowWrapper>
                                                    {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i)
                                                        ? <Icon name='angle down'/>
                                                        : <Icon name='angle right'/>}
                                                    <div>{group.grouptitle}</div>
                                                </DropArrowWrapper>
                                                <div>{(group.tasks || []).map(task => task.tasktime.map(tasktime => tasktime.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0)}</div>
                                            </TaskListTimeWrapper>
                                            {
                                                (group.tasks || []).map(task =>
                                                    this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) &&
                                                    <UserTimePerTask>
                                                        <div>
                                                            {task.tasktime.map(x =>
                                                                <div>{x.user.username}</div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {task.tasktime.map(x =>
                                                                <div>{x.time}</div>
                                                            )}
                                                        </div>
                                                    </UserTimePerTask>
                                                )
                                            }
                                        </div>
                                    )))
                                }
                            </div>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default ProjectTimeCards;