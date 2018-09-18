import React, {Component} from 'react';
import { graphql, compose } from "react-apollo";
import {removeTask, updateTask} from "../../apollo-graphql/taskQueries";
import moment from 'moment';
import TableBodyRow from './grid/TableBodyRow';
import TableCellCentered from './grid/TableCellCentered';
import TableCellLeft from './grid/TableCellLeft';
import TextInputCell from './grid/TextInputCell';
import DateInputCell from './grid/DateInputCell';
import TaskComplete from '../taskscomponents/TaskComplete';
// import styled from 'styled-components';

class TaskGridRow extends Component {
    state = {
        taskData: this.props.task,
        title: this.props.task.tasktitle,
        description: (this.props.task.taskdescription || ''),
        plandate: moment.utc(this.props.task.plandate).format('YYYY-MM-DD'),
        duedate: moment.utc(this.props.task.duedate).format('YYYY-MM-DD'),
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
        const {
            taskData,
            descriptionInput,
            title,
            description,
            plandate,
            duedate
        } = this.state;




        // const _removeTask = async (e) => {
        //     e.preventDefault();
        //     await this.props.removeTask({
        //         variables:variables,
        //         refetchQueries: [{query: updateQuery, variables: variables}]
        //     });
        // };

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
                <TableCellLeft>
                    <TextInputCell
                        type='text'
                        placeholder={title}
                        value={title}
                        onChange={e => this.setState({title: e.target.value})}
                    />
                </TableCellLeft>
                <TableCellLeft>
                    <TextInputCell
                        type='text'
                        placeholder={description}
                        value={description}
                        onChange={e => this.setState({description: e.target.value})}
                    />
                </TableCellLeft>
                <TableCellCentered>
                    <DateInputCell
                        type='date'
                        placeholder={duedate}
                        value={duedate}
                        onChange={e => this.setState({duedate: e.target.value})}
                    />
                </TableCellCentered>
                <TableCellCentered>
                    <DateInputCell
                        type='date'
                        placeholder={plandate}
                        value={plandate}
                        onChange={e => this.setState({plandate: e.target.value})}
                    />
                </TableCellCentered>
                <TableCellLeft> {task.group.grouptitle} </TableCellLeft>
                <TableCellLeft> {task.project.projecttitle} </TableCellLeft>
                <TableCellLeft> {task.team.teamtitle} </TableCellLeft>
                <TableCellCentered/>
                <TableCellCentered/>
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
