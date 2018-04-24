import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Card, Dimmer, Loader} from 'semantic-ui-react';
import { task} from "../apollo-graphql/taskQueries";



class TaskDetail extends Component {

    render() {
        const {taskId} = this.props.location.state;
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
                                <Card.Meta>{data.task.tasktitle}</Card.Meta>
                                <Card.Description>
                                    {data.task.plandate}
                                    {data.task.duedate}
                                    {data.task.completeddate}
                                    {data.task.taskcurrentowner.username}
                                    </Card.Description>
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