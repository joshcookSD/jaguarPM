import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { Card, Form, Button} from 'semantic-ui-react';
import { task } from "../../../apollo-graphql/taskQueries";
import moment from 'moment';
import TeamTaskOptions from './TeamTaskOptions';
import ProjectTaskOptions from './ProjectTaskOptions';
import GroupTaskOptions from './GroupTaskOptions';
import AssignedTaskOptions from './AssignedTaskOptions';
import RemoveTask from './RemoveTask';
import { TaskDetailLayout }from './TaskDetailLayout';
import { TaskDetailLine } from './TaskDetailLine';
import DueDateForm from "./DueDateForm";
import PlanDateForm from "./PlanDateForm";
import DescriptionForm from "./DescriptionForm";



const detailTask = gql`
 query task($_id: String!){
  task(_id: $_id) {
    _id
    tasktitle
    taskdescription
    taskstatus
    iscompleted
    plandate
    duedate
    completeddate
    createdAt
    priority{
        _id
        priority
        }
    group {
        _id
        grouptitle
        }
    project {
        _id
        projecttitle
        }
    team {
        _id
        teamtitle
        users {
            _id
            username
        }
        projects{
            _id
            projecttitle
            groups {
                _id
                grouptitle
            }
        }
    }
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;

class TaskDetail extends Component {
    state = {
        descriptionInput: false,
        description: '',
        planDateInput: false,
        plandate: '',
        dueDateInput: false,
        duedate: '',
        taskTeamInput: false,
        projectInput: false,
        groupInput: false,
        group: '',
        assignedInput: false,
    };

    closeDueDate = () => {
        this.setState({dueDateInput: false});
    };

    closePlanDate = () => {
        this.setState({planDateInput: false});
    };

    closeDescription = () => {
        this.setState({descriptionInput: false});
    };

    closeTeam = () => {
        this.setState({taskTeamInput: false});
    };

    closeProject = () => {
        this.setState({projectInput: false});
    };

    closeGroup = () => {
        this.setState({groupInput: false});
    };

    closeAssigned = () => {
        this.setState({assignedInput: false})
    };

    render() {
        const {taskId, tasktitle, updateQuery, refreshVariables, queryType, userId} = this.props;
        const queryVariables = {_id: taskId};
        const {descriptionInput, planDateInput, dueDateInput, assignedInput, taskTeamInput, projectInput, groupInput, description, plandate, duedate} = this.state;



            return (
                <Query query={detailTask} variables={queryVariables}>
                    {({loading, error, data}) => {
                        if (loading) return (
                            <div>
                                ...wait for it....
                            </div>);
                        if (error) return <p>Error :(</p>;
                        return (
                                <TaskDetailLayout>
                                    <Card.Content>
                                        <TaskDetailLine onClick={() => this.setState({descriptionInput: !descriptionInput, description: data.task.taskdescription})}>
                                            Description: {!descriptionInput && data.task.taskdescription}
                                        </TaskDetailLine>
                                        {descriptionInput &&
                                        <DescriptionForm
                                            task={data.task}
                                            query={task}
                                            variables={queryVariables}
                                            closeDescription={this.closeDescription}
                                        />}
                                        <TaskDetailLine
                                            onClick={() => this.setState({planDateInput: !planDateInput, plandate: data.task.plandate})}>
                                            Plan Date: {data.task.plandate ? moment.utc(data.task.plandate).format('YYYY-MM-DD') : ''}
                                        </TaskDetailLine>
                                        {planDateInput &&
                                        <PlanDateForm
                                            task={data.task}
                                            query={task}
                                            variables={queryVariables}
                                            closePlanDate={this.closePlanDate}
                                        />}
                                        <TaskDetailLine onClick={() => this.setState({dueDateInput: !dueDateInput, duedate: data.task.duedate})}>
                                            Due Date: {data.task.duedate ? moment.utc(data.task.duedate).format('YYYY-MM-DD') : ''}
                                        </TaskDetailLine>
                                        {dueDateInput && <DueDateForm
                                                task={data.task}
                                                query={task}
                                                variables={queryVariables}
                                                closeDueDate={this.closeDueDate}
                                            />
                                        }
                                        <TaskDetailLine
                                            onClick={() => this.setState({taskTeamInput: !taskTeamInput})}>
                                            Team: {!data.task.team ? 'unassigned' : data.task.team.teamtitle}
                                        </TaskDetailLine>
                                        {taskTeamInput && <TeamTaskOptions
                                            taskId={taskId}
                                            userId={userId}
                                            teamDetails={data.task.team}
                                            updateQuery={task}
                                            refreshVariables={queryVariables}
                                            closeTeam={this.closeTeam}
                                        />}
                                        <TaskDetailLine
                                            onClick={() => this.setState({projectInput: !projectInput})}>
                                            Project: {!data.task.project ? 'unassigned' : data.task.project.projecttitle}
                                        </TaskDetailLine>
                                        {projectInput && <ProjectTaskOptions
                                            taskId={taskId}
                                            teamId={data.task.team._id}
                                            projectDetails={data.task.project}
                                            query={task}
                                            variables={queryVariables}
                                            closeProject={this.closeProject}/>}
                                        <TaskDetailLine
                                            onClick={() => this.setState({groupInput: !groupInput})}>
                                            Group: {!data.task.group ? 'unassigned' : data.task.group.grouptitle}
                                        </TaskDetailLine>
                                        {groupInput && <GroupTaskOptions
                                            taskId={taskId}
                                            projectId={data.task.project._id}
                                            groupDetails={data.task.group}
                                            query={task}
                                            variables={queryVariables}
                                            closeGroup={this.closeGroup}/>}
                                        <TaskDetailLine
                                            onClick={() => this.setState({assignedInput: !assignedInput})}>
                                            Assigned to: {!data.task.taskcurrentowner ? 'unassigned' : data.task.taskcurrentowner.username}
                                        </TaskDetailLine>
                                        {assignedInput && <AssignedTaskOptions
                                            taskId={taskId} teamId={data.task.team._id}
                                            userDetails={data.task.taskcurrentowner}
                                            userId={userId}
                                            query={task}
                                            queryVariables={queryVariables}
                                            closeAssigned={this.closeAssigned}
                                            openDetail={this.props.openDetail}/>}
                                        <TaskDetailLine>
                                            Created: {moment.utc(data.task.createdAt).format('YYYY-MM-DD')}
                                        </TaskDetailLine>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button.Group fluid>
                                        <Button
                                            size='small'
                                            color='green'
                                            onClick={() => this.props.openDetail() }
                                            basic>update</Button>
                                        <RemoveTask
                                            taskId={taskId}
                                            updateQuery={updateQuery}
                                            refreshVariables={refreshVariables}
                                            queryType={queryType}
                                            openDetail={this.props.openDetail}
                                        />
                                        </Button.Group>
                                    </Card.Content>
                                </TaskDetailLayout>
                        )
                    }
                    }
                </Query>
            )
        }
}

export default TaskDetail;