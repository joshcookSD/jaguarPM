import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Card, Dimmer, Loader} from 'semantic-ui-react';
import { task} from "../apollo-graphql/taskQueries";
import moment from 'moment';


class TaskDetail extends Component {

    render() {
        const {taskId} = this.props;
        const variables = {_id: taskId};
        return(
            <Query query={task} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{data.task.tasktitle}</Card.Header>
                                <Card.Meta>{data.task.taskdescription}</Card.Meta>
                                <Card.Description>Plan Date: {moment(data.task.plandate).format('YYYY-MM-DD')}</Card.Description>
                                <Card.Description>Due Date: {moment(data.task.duedate).format('YYYY-MM-DD')}</Card.Description>
                                <Card.Description>Assigned: {data.task.taskcurrentowner.username}</Card.Description>
                            </Card.Content>
                        </Card>
                    )
                }
                }
            </Query>
        )
    }
}



export default TaskDetail;