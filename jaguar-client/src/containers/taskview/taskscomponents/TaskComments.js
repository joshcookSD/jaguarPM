import React, {Component} from 'react'
import { Comment, Dimmer, Loader} from 'semantic-ui-react'
import { Query } from "react-apollo";
import { taskComments } from "../../apollo-graphql/commentQueries";
import moment from 'moment';
import TaskCommentForm from "./TaskCommentForm";



class TaskComments extends Component {

    render() {
        const {taskId, userId} = this.props;
        const queryVariables = {task: taskId};

        return (
            <Query query={taskComments} variables={queryVariables}>
                {({loading, error, data}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>);

                    if (error) return <p>Error :(</p>;

                    return (
                        <Comment.Group size='small'>
                            <TaskCommentForm taskId={taskId} userId={userId} updateQuery={taskComments} variables={queryVariables}/>
                        {data.taskComments.map(({_id, comment, user, createdAt}) => (
                            <Comment key={_id}>
                                <Comment.Content>
                                    {userId === user._id ? <Comment.Author as='a'>you</Comment.Author> : <Comment.Author as='a'>{user.username}</Comment.Author>}
                                    <Comment.Metadata>
                                        <div>{moment.utc(createdAt).format('MM/DD')}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ))
                        }
                        </Comment.Group>
                    )
                }}
            </Query>
        )
    }
}

export default TaskComments;
