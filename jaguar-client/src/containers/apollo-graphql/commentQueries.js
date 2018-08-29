import gql from "graphql-tag";

const taskComments = gql`
 query taskComments($task: String){
  taskComments( task: $task) {
    _id
    comment
    user {
        _id
        username
        }
    createdAt
  }
}
 `;

const createTaskComments = gql`
mutation createTaskComment( $comment: String, $user: String, $task: String) {
    createTaskComment(comment: $comment, user: $user, task: $task) {
        _id
        comment
        user {
            username
            }
        task {
            tasktitle
        }
        }
    }
 `;

export {taskComments, createTaskComments}