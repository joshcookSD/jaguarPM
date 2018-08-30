import React, {Component} from 'react';
import { graphql, compose } from "react-apollo";
import {removeTask, updateTask} from "../../apollo-graphql/taskQueries";
import { Form } from 'semantic-ui-react';
import moment from 'moment';
import TableBodyRow from '../../components/table/TableBodyRow';
import TableCellCentered from '../../components/table/TableCellCentered';
import TableCellLeft from '../../components/table/TableCellLeft';
import TaskComplete from './TaskComplete';

class TaskGridRow extends Component {
    state = {
        taskData: this.props.task,
        titleInput: false,
        title: '',
        descriptionInput: false,
        description: '',
        planDateInput: false,
        plandate: '',
        dueDateInput: false,
        duedate: '',
        taskTeamInput: false,
        projectInput: false,
        groupInput: false,
        assignedInput: false,
    };

    componentWillReceiveProps(nextProps){
        if(this.props.tasks !== nextProps.tasks){
            this.setState({
                taskData: this.props.tasks
            });
        }
    }

    render() {
        const {task, user, updateQuery, variables, today} = this.props;
        console.log(task);
        const {
            taskData,
            titleInput,
            descriptionInput,
            planDateInput,
            dueDateInput,
            assignedInput,
            taskTeamInput,
            projectInput,
            groupInput,
            title,
            description,
            plandate,
            duedate
        } = this.state;

        const updateVariables = {
            _id: task._id,
            tasktitle: title,
            taskdescription: description,
            duedate,
            plandate
        };

        const _updateTask = async () => {
            await this.props.updateTask({
                variables: updateVariables,
                refetchQueries: [{query: updateQuery, variables: variables}]
            });
            this.setState({
                descriptionInput: false,
                planDateInput: false,
                dueDateInput: false,
                assignedInput: false,
                teamTaskInput: false,
                projectInput: false,
            })
        };

        const _removeTask = async (e) => {
            e.preventDefault();
            await this.props.removeTask({
                variables:variables,
                refetchQueries: [{query: updateQuery, variables: variables}]
            });
        };

        return (
            <TableBodyRow>
                <TableCellCentered>
                    <TaskComplete
                        _id={task._id}
                        groupForTasksId={task.group._id}
                        userId={user}
                        completeddate={today}
                        updateQuery={updateQuery}
                        variables={variables}
                        duedate={task.duedate}
                        plandate={task.plandate}
                        isComplete={task.iscompleted}
                    />
                </TableCellCentered>
                <TableCellLeft onClick={() => this.setState({titleInput: true, title: task.tasktitle, description: task.taskdescription})}>
                    {titleInput ?
                        <Form onSubmit={() => _updateTask()}>
                            <Form.Input
                                fluid
                                placeholder={taskData.tasktitle}
                                value={title}
                                onChange={e => this.setState({title: e.target.value})}
                            />
                        </Form>
                        : taskData.tasktitle}
                </TableCellLeft>
                <TableCellLeft onClick={() => this.setState({descriptionInput: true, title: task.tasktitle, description: task.taskdescription})}>
                    {descriptionInput ?
                        <Form onSubmit={() => _updateTask()}>
                            <Form.Input
                                fluid
                                placeholder={task.taskdescription}
                                value={description}
                                onChange={e => this.setState({description: e.target.value})}
                            />
                        </Form>
                        : task.taskdescription}
                </TableCellLeft>
                <TableCellCentered> {task.duedate ? moment.utc(task.duedate).format('YYYY-MM-DD') : 'No Date'} </TableCellCentered>
                <TableCellCentered> {task.plandate ? moment.utc(task.plandate).format('YYYY-MM-DD') : 'No Date'} </TableCellCentered>
                <TableCellLeft> {task.group.grouptitle} </TableCellLeft>
                <TableCellLeft> {task.project.projecttitle} </TableCellLeft>
                <TableCellLeft> {task.team.teamtitle} </TableCellLeft>
                <TableCellCentered/>
                <TableCellCentered/>
                <TableCellCentered> <button type='submit'>U</button></TableCellCentered>
            </TableBodyRow>
        )
    }
}

export default compose(
    graphql(updateTask, {
        name: 'updateTask',
    }),
    graphql(removeTask, {
        name: 'removeTask',
    })
)(TaskGridRow);
