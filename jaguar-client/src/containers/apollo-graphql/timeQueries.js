import gql from "graphql-tag";

const createTaskTime = gql`
mutation createTimeTask($time: Float!, $comment: String, $date: String, $task:String, $user: String) {
    createTimeTask(time: $time, comment:$comment, date: $date, task: $task, user: $user) {
        time
        comment
        date
        task {
            tasktitle
        }
        user {
            username
            }
        }
    }
`;

export {createTaskTime};