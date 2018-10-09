import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import moment from 'moment';
import TableBodyRow from './grid/TableBodyRow';
import TableCellCentered from './grid/TableCellCentered';
import TableCellLeft from './grid/TableCellLeft';
import TextInputCell from './grid/TextInputCell';
import DateInputCell from './grid/DateInputCell';
import TaskComplete from '../taskscomponents/TaskComplete';
import GroupGridOptions from './grid/GroupGridOptions';
import ProjectGridOptions from './grid/ProjectGridOptions';
import TeamGridOptions from './grid/TeamGridOptions';

const updateTaskGrid = gql`
mutation updateTask($_id: String, $tasktitle: String, $taskdescription: String, $taskcurrentowner: String, $iscompleted: Boolean, $plandate: Date, , $duedate: Date, $taskGroupId: String) {
    updateTask(_id: $_id, tasktitle: $tasktitle, taskdescription: $taskdescription, taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate, duedate: $duedate, taskGroupId: $taskGroupId) {
        _id
        tasktitle
        taskdescription
        plandate
        duedate
        taskcurrentowner {
          _id
          username
            }
        }
    }
`;

class TaskGridRow extends Component {
    state = {
        taskData: this.props.task,
        title: this.props.task.tasktitle,
        description: (this.props.task.taskdescription || ''),
        plandate: moment.utc(this.props.task.plandate).format('YYYY-MM-DD'),
        duedate: moment.utc(this.props.task.duedate).format('YYYY-MM-DD'),
    };

    _updateTask = async (e, updateTask) => {
        await updateTask({
            variables: {
                _id: this.state.taskData._id,
                tasktitle: this.state.title,
                taskdescription: this.state.description,
                iscompleted: this.state.taskData.iscompleted,
                plandate: this.state.plandate,
                duedate: this.state.duedate,
                taskGroupId: this.state.taskData.group
            },
            update: async (store, {data: {updateTask}}) => {
                const { user } = store.readQuery({
                    query: this.props.query,
                    variables: this.props.variables
                });
                const userTask = user.tasks.find(task => task._id === this.state.taskData._id );
                user.tasks.map(task => userTask._id === task._id ? userTask : task);
                await store.writeQuery({
                    query: this.props.query,
                    variables: this.props.variables,
                    data: { user }
                });
            }
        });
    };

    render() {
        const {task, user, updateQuery, variables, today} = this.props;
        const {
            title,
            description,
            plandate,
            duedate
        } = this.state;


        return (
            <Mutation mutation={updateTaskGrid}>
                {(updateTask, { data }) => (
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
                        <form onSubmit={async e => {
                                e.preventDefault();
                                await this._updateTask(e, updateTask);
                            }
                        }>
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
                        <TableCellLeft>
                            <DateInputCell
                                type='date'
                                placeholder={duedate}
                                value={duedate}
                                onChange={e => this.setState({duedate: e.target.value})}
                            />
                        </TableCellLeft>
                        <TableCellLeft>
                            <DateInputCell
                                type='date'
                                placeholder={plandate}
                                value={plandate}
                                onChange={e => this.setState({plandate: e.target.value})}
                            />
                        </TableCellLeft>
                        </form>
                        <TableCellLeft>
                            <GroupGridOptions
                                taskId={task._id}
                                projectId={task.project._id}
                                groupDetails={task.group}
                                query={updateQuery}
                                variables={variables}
                            />
                        </TableCellLeft>
                        <TableCellLeft>
                            <ProjectGridOptions
                                taskId={task._id}
                                projectId={task.project._id}
                                teamId={task.team._id}
                                projectDetails={task.project}
                                query={updateQuery}
                                variables={variables}
                            />
                        </TableCellLeft>
                        <TableCellLeft>
                            <TeamGridOptions
                                taskId={task._id}
                                userId={user}
                                teamDetails={task.team}
                                updateQuery={updateQuery}
                                refreshVariables={variables}
                            />
                        </TableCellLeft>
                    </TableBodyRow>
                )}
            </Mutation>
        )
    }
}

export default TaskGridRow;
