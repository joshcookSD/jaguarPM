import React, {Component} from 'react';
import { graphql } from "react-apollo";
import {updateCurrentTask} from '../../apollo-graphql/userQueries';
import { Icon } from 'semantic-ui-react';

class TaskCurrent extends Component {

    render() {
        const {taskId, userId, currentTask, updateQuery, variables}= this.props;
        const _makeCurrent = async () => {
            await this.props.makeCurrent({
                variables: {_id: userId, currenttask: taskId, previoustask: currentTask},
                refetchQueries: [{ query: updateQuery, variables: variables}]
            })
        };
        return (
            <Icon
                name='ellipsis horizontal'
                size='large'
                floated='right'
                onClick={() => _makeCurrent()}
            />
        )
    }
}

export default graphql(updateCurrentTask,{
    name: 'makeCurrent',
})(TaskCurrent);
