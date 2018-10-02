
import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Dimmer, Loader, Checkbox, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from "moment/moment";
import gql from "graphql-tag";
import {projectDetails} from "./ProjectTaskPriorietyMain";

const GroupCompleteWrapper = styled.div`
    display: flex;
`;
const GroupTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background: #e0e1e2;
    border-radius: .28571429rem;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
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

const completeTask = gql`
mutation completeTask($_id: String!, $iscompleted: Boolean, $completeddate:Date, $groupForTasksId: String!) {
    completeTask(_id: $_id, iscompleted: $iscompleted, completeddate: $completeddate, groupForTasksId: $groupForTasksId) {
        _id
        completeddate
        iscompleted  
        }
    }
`;


class ProjectTaskPriorietyList extends Component {

    state = {
        projectId: '',
        groupIdForTasksDrop: '',
        dropdownopen: false,
        hoveringSquare: false,
        hoveringSquareindex: ''
    };

    handler = (group) =>{
        this.setState({groupIdForTasksDrop: group});
        this.setState({dropdownopen: !this.state.dropdownopen})
    };

    onEnterSquare = (i) => this.setState({ hoveringSquare: true, hoveringSquareindex: i });
    onExitSquare = () => this.setState({ hoveringSquare: false, hoveringSquareindex: '' });

    render() {
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { data, selectedProject } = this.props;
        return (
            <Mutation mutation={completeTask}>
                {(completeTask, { loading }) => {
                    return (
                        <div>
                            {
                                data.project.groups.map((group) =>
                                    <div>
                                        <GroupTitleWrapper onClick={() => this.handler(group._id)}>
                                            <div>Group {group.grouptitle}</div>
                                            {//map through tasks
                                                (group.tasks.length === 0)
                                                    ? <div>No Tasks</div>
                                                    : (
                                                        group.tasks.filter(task => task.iscompleted === true).length) === (group.tasks.length)
                                                        ? (<GroupCompleteWrapper>
                                                                <Icon name='flag checkered' />
                                                                {/*<div>Group Completed</div>*/}
                                                            </GroupCompleteWrapper>)
                                                        : (<TaskDataAndIconWrapper>
                                                            <div>{group.tasks.filter(task => task.iscompleted === true).length} / {group.tasks.length}</div>
                                                        </TaskDataAndIconWrapper>
                                                    )
                                            }
                                        </GroupTitleWrapper>
                                        {this.state.groupIdForTasksDrop === group._id && this.state.dropdownopen &&
                                            group.tasks.map((task, i) =>
                                                <TaskTitleWrapper>
                                                    <div>{task.tasktitle}</div>
                                                    {
                                                        (task.iscompleted === true) ?
                                                            <Icon name='check circle' color='green' size='large'/> :
                                                            <Icon
                                                                name='square outline'
                                                                onMouseEnter={() => this.onEnterSquare(i)}
                                                                onMouseLeave={this.onExitSquare}
                                                                color={this.state.hoveringSquare && this.state.hoveringSquareindex === i ? 'blue' : 'green'}
                                                                size='large'
                                                                onClick={async e => {
                                                                    e.preventDefault();
                                                                    await completeTask({
                                                                        variables: {
                                                                            _id: task._id,
                                                                            iscompleted: true,
                                                                            completeddate: today,
                                                                            groupForTasksId: group._id
                                                                        },
                                                                        update: async (store) => {
                                                                            let { project } = store.readQuery({query: projectDetails, variables: {_id: selectedProject} });
                                                                            let completedTaskGroup = project.groups.find(groupp => groupp._id === group._id );
                                                                            let completedTask = completedTaskGroup.tasks.find(taskk => taskk._id === task._id );
                                                                            completedTask.iscompleted = !completedTask.iscompleted;
                                                                            await store.writeQuery({
                                                                                query: projectDetails,
                                                                                variables: {_id: selectedProject},
                                                                                data: { project }
                                                                            });

                                                                        }
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
            </Mutation>
        )
    }
}


export default ProjectTaskPriorietyList