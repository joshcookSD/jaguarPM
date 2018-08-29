import React, {Component} from 'react';
import moment from 'moment';
import Table from '../components/table/Table';
import TableHeader from '../components/table/TableHeader';
import TableHeaderRow from '../components/table/TableHeaderRow';
import TableHeaderCell from '../components/table/TableHeaderCell';
import TableBody from '../components/table/TableBody';
import TaskGridRow from './taskscomponents/TaskGridRow'


class TaskGrid extends Component {
    state = {
        taskData: this.props.tasks,
    };

    componentWillReceiveProps(nextProps){
        if(this.props.tasks !== nextProps.tasks){
            this.setState({
                taskData: this.props.tasks
            });
        }
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        let arrayCopy = [...this.state.taskData];
        arrayCopy.sort(this.compareBy(key));
        this.setState({taskData: arrayCopy});
    }

    render() {
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { user, updateQuery, variables } = this.props;
        const sortData = this.state.taskData;
        const headers =  [" ", "task", "description", "duedate", "plandate", "group", "project", "team", "tasktime", "taskplannedtime" ];

        return (
            <Table>
               <TableHeader>
               <TableHeaderRow>
                   {headers.map(head =>
                       <TableHeaderCell onClick={() => this.sortBy(head)} key={head}> {head} </TableHeaderCell>
                   )}
               </TableHeaderRow>
               </TableHeader>
                <TableBody>
                {sortData.map((task) => (
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

export default TaskGrid;
