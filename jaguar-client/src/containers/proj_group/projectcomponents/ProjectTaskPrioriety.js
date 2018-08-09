
import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import {completeTask} from "../../apollo-graphql/taskQueries";
import {completeGroup} from "../../apollo-graphql/groupProjectQueries";
import moment from "moment/moment";
import { Mutation } from "react-apollo";

const GroupTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background: #e0e1e2;
    border-radius: .28571429rem;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
`;

const ProjectTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 10px;
`;

const TaskDataAndIconWrapper = styled.div`
    display: flex;
    justify-content: space-between;

`;

const TaskTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    &:hover  {
    background-color: #e6fff1
    border-radius: .28571429rem;
  }
`;

class ProjectTaskPrioriety extends Component {
    // set selected project to state
    componentWillUpdate(nextProps) {
        if(nextProps.selectedProject !== this.props.selectedProject) {
            this.setState({projectId: nextProps.selectedProject});
        }
    }

    state = {
        projectId: '',
        groupIdForTasksDrop: '',
        dropdownopen: false

    };

    handler = (group) =>{
        this.setState({groupIdForTasksDrop: group});
        this.setState({dropdownopen: !this.state.dropdownopen})
    };

    render() {
        const today = moment(Date.now()).format('YYYY-MM-DD');

        const {
            projectDetails,
            queryVariables,
        } = this.props;

        const {
            projectId,
        } = this.state;

        if(projectId) {
            return (
                <Mutation mutation={completeTask}>
                    {(completeTask, { loading }) => {
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader/>
                                </Dimmer>
                            </div>
                        );
                        return (
                            <Mutation mutation={completeGroup}>
                                {(completeGroup, { loading }) => {
                                    if (loading) return (
                                        <div>
                                            <Dimmer active>
                                                <Loader/>
                                            </Dimmer>
                                        </div>
                                    );
                                    return (
                                        <Query query={projectDetails} variables={queryVariables}>
                                            {({loading, error, data}) => {
                                                if (loading) return (
                                                    <div>
                                                        <Dimmer active>
                                                            <Loader/>
                                                        </Dimmer>
                                                    </div>
                                                );
                                                return (
                                                    <div>
                                                        <ProjectTitleWrapper>
                                                            <div>Project : {data.project.projecttitle}</div>
                                                            <div>Groups Completed
                                                                : {data.project.groups.filter(group => group.iscompleted === true).length} / {data.project.groups.length}
                                                            </div>
                                                        </ProjectTitleWrapper>
                                                        {// map through groups
                                                            data.project.groups.map((group) =>
                                                                <div>
                                                                    <GroupTitleWrapper onClick={() => this.handler(group._id)}>
                                                                        <div>Group {group.grouptitle}</div>
                                                                        {//map through tasks
                                                                            (group.tasks.length === 0) ? <div>No Tasks</div> :
                                                                                (group.tasks.filter(task => task.iscompleted === true).length) === (group.tasks.length)
                                                                                    ? (<div>Group Completed</div>)
                                                                                    : (<TaskDataAndIconWrapper>
                                                                                        <div>{group.tasks.filter(task => task.iscompleted === true).length} / {group.tasks.length}</div>
                                                                                    </TaskDataAndIconWrapper>)


                                                                        }
                                                                    </GroupTitleWrapper>
                                                                    {this.state.groupIdForTasksDrop === group._id && this.state.dropdownopen &&
                                                                    group.tasks.map(task =>
                                                                        <TaskTitleWrapper>
                                                                            <div>{task.tasktitle}</div>
                                                                            {
                                                                                (task.iscompleted === true) ?
                                                                                    <div>done!</div> :
                                                                                    <Checkbox
                                                                                        radio
                                                                                        onChange={async e => {
                                                                                            e.preventDefault();
                                                                                            await completeTask({
                                                                                                variables: {
                                                                                                    _id: task._id,
                                                                                                    iscompleted: true,
                                                                                                    completeddate: today,
                                                                                                    groupForTasksId: group._id
                                                                                                },
                                                                                                refetchQueries:
                                                                                                [{
                                                                                                    query: projectDetails,
                                                                                                    variables: queryVariables
                                                                                                }]
                                                                                            });
                                                                                        }}
                                                                                    />
                                                                            }
                                                                        </TaskTitleWrapper>
                                                                    )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }}
                                        </Query>
                                    )
                                }}
                            </Mutation>
                        )
                    }}
                </Mutation>
            )
        } else { return (<div/>) }
    }
}

export default ProjectTaskPrioriety