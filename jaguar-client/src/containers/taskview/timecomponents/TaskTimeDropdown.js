import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import {Dropdown} from 'semantic-ui-react';

const taskOptions = gql`
query group($_id: String!) {
    group(_id: $_id) {  
        _id
        grouptitle
        tasks {
            _id
            tasktitle
        }
    }
}`;

class TaskTimeDropdown extends Component {
    state = {
        update: false
    };

    render() {
        const { group, timeTask} = this.props;
        const _selectTask = (task) => {
            this.setState({selectedTask: task});
            this.props.selectTask(task);
        };

        return(
            <Query query={taskOptions} variables={{_id: group._id}}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>loading...</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                        <Dropdown text={timeTask.tasktitle}  fluid scrolling floating labeled button className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Header content={taskOptions.length > 0 ? 'Task' : 'No Tasks Currently for this group'} />
                                {(data.group.tasks || []).map((option, i) =>
                                    <Dropdown.Item
                                        key={i}
                                        value={option._id}
                                        text={option.tasktitle}
                                        {...option}
                                        onClick={() => {
                                            _selectTask(option);
                                        }}
                                    />)}
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                }
                }
            </Query>
        )
    }
}

export default TaskTimeDropdown;