import React, {Component} from 'react';
import { graphql } from "react-apollo";
import {completeTask} from '../../apollo-graphql/taskQueries';
import { List} from 'semantic-ui-react';
import moment from 'moment';

class TaskComplete extends Component {
    state={
        taskComplete: false,
    };

    render() {
        const {_id, completeddate, updateQuery, variables, duedate, plandate} = this.props;
        const {taskComplete} = this.state;
        const pastDue =  moment.utc(duedate).format('YYYY-MM-DD') < completeddate;
        const pastPlan = moment.utc(plandate).format('YYYY-MM-DD') < completeddate;
        const _complete = async () => {
            this.setState({taskComplete: !taskComplete});
            await this.props.complete({
                variables: {_id: _id, iscompleted: true, completeddate: completeddate},
                refetchQueries: [{ query: updateQuery, variables: variables}]
            })
        };
        return (
            <List.Icon
                name={taskComplete ? 'check circle' : pastDue ? 'alarm' : pastPlan ? 'warning sign' : 'square outline'}
                size='large'
                color= { taskComplete ? 'green' : pastDue ? 'red' : pastPlan ? 'yellow' : 'green'}
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
