import React, {Component} from 'react';
import { graphql } from "react-apollo";
import gql from 'graphql-tag';
import { List} from 'semantic-ui-react';
import moment from 'moment';

const completeTask = gql`
mutation completeTask($_id: String!, $iscompleted: Boolean, $completeddate:Date, $groupForTasksId: String!) {
    completeTask(_id: $_id, iscompleted: $iscompleted, completeddate: $completeddate, groupForTasksId: $groupForTasksId) {
        _id
        tasktitle
        taskdescription
        completeddate
        iscompleted  
        }
    }
`;

class TaskComplete extends Component {
    state={
        taskComplete: this.props.isComplete,
    };

    _completeTaskUser = async (store, completeTask, taskId) =>{
        const { user } = store.readQuery({ query: this.props.updateQuery, variables: this.props.variables});
        const completedTask = user.tasks.find(task => task._id === taskId );
        completedTask.iscompleted = !completedTask.iscompleted;
        await store.writeQuery({
            query: this.props.updateQuery,
            variables: this.props.variables,
            data: { user }
        });
    };

    _completeTaskTeam = async (store, completeTask, taskId) =>{
        const { team } = store.readQuery({ query: this.props.updateQuery, variables: this.props.variables});
        const completedTask = team.tasks.find(task => task._id === taskId );
        completedTask.iscompleted = !completedTask.iscompleted;
        await store.writeQuery({
            query: this.props.updateQuery,
            variables: this.props.variables,
            data: { team }
        });
    };

    render() {
        const {_id, completeddate, duedate, plandate, isComplete, group, queryType}= this.props;
        const {taskComplete} = this.state;
        const pastDue =  moment.utc(duedate).format('YYYY-MM-DD') < completeddate;
        const pastPlan = moment.utc(plandate).format('YYYY-MM-DD') < completeddate;
        const _complete = async () => {
            this.setState({taskComplete: !taskComplete});
            await this.props.complete({
                variables: {_id: _id, iscompleted: !isComplete, completeddate: completeddate, groupForTasksId: group},
                update: async (store, {data: {completeTask}}) =>{
                    queryType === 'user' ? this._completeTaskUser(store, completeTask, _id) : this._completeTaskTeam(store, completeTask, _id);
                }
            })
        };
        return (
            <List.Icon
                name={taskComplete ? 'check circle' : pastDue ? 'alarm' : pastPlan ? 'warning sign' : 'square outline'}
                size='large'
                color= { taskComplete? 'green' : pastDue ? 'red' : pastPlan ? 'yellow' : 'green'}
                verticalAlign='middle'
                style={{
                    paddingRight: '.5em',
                }}
                onClick={() => _complete()}
            />
    )
    }
}



export default graphql(completeTask,{
    name: 'complete',
})(TaskComplete);
