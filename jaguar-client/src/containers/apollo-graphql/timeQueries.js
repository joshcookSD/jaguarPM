import gql from "graphql-tag";

const createTaskTime = gql`
mutation createTimeTask($time: Float!, $timecomment: String, $date: Date, $task:String, $user: String) {
    createTimeTask(time: $time, timecomment:$timecomment, date: $date, task: $task, user: $user) {
        time
        timecomment
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