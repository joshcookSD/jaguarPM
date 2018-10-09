import React, {Component} from 'react';
import { graphql, compose } from "react-apollo";
// import moment from 'moment';
import Table from './taskgridcomponents/grid/Table';
import TableHeader from './taskgridcomponents/grid/TableHeader';
import TableHeaderRow from './taskgridcomponents/grid/TableHeaderRow';
import TableHeaderCell from './taskgridcomponents/grid/TableHeaderCell';
import TableBody from './taskgridcomponents/grid/TableBody';
import TaskGridRow from './taskgridcomponents/TaskGridRow'
import {updateTask} from "../apollo-graphql/taskQueries";


class TaskGridView extends Component {

    render() {
        // const today = moment(Date.now()).format('YYYY-MM-DD');
        const { user, updateQuery, variables, tasks } = this.props;
        const headers =  [" ", "task", "description", "duedate", "plandate", "group", "project", "team"];

        // const _updateTask = async () => {
        //     await this.props.updateTask({
        //         variables: updateVariables,
        //         refetchQueries: [{query: updateQuery, variables: variables}]
        //     });
        // };

        return (
            <Table>
               <TableHeader>
               <TableHeaderRow>
                   {headers.map(head =>
                       <TableHeaderCell> {head} </TableHeaderCell>
                   )}
               </TableHeaderRow>
               </TableHeader>
                <TableBody>
                {tasks.map((task) => (
                        <TaskGridRow
                            key={task._id}
                            task={task}
                            user={user}
                            updateQuery={updateQuery}
                            variables={variables}
                        />
                    )
                )}
                </TableBody>
            </Table>
        )
    }
}

export default compose(
    graphql(updateTask, {
        name: 'updateTask',
    })
)(TaskGridView);
