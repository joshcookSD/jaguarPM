import React, {Component} from 'react';
import { graphql } from "react-apollo";
import {completeTask} from '../../apollo-graphql/taskQueries';
import { List} from 'semantic-ui-react';

class TaskComplete extends Component {
    state={
        taskComplete: false,
    };

    render() {
        const {taskComplete} =this.state;
        const _complete = async () => {
            this.setState({taskComplete: !taskComplete});
            await this.props.complete({
                variables: {_id: this.props._id, iscompleted: true, completeddate: this.props.completeddate},
                refetchQueries: [{ query: this.props.updateQuery, variables: this.props.variables}]
            })
        };
        return(
            <List.Icon
                name={taskComplete ? 'check circle':'square outline'}
                size='large'
                color='green'
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
