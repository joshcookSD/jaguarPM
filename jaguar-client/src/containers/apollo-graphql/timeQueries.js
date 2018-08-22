import gql from "graphql-tag";

const createTaskTime = gql`
mutation createTimeTask($time: Float!, $timecomment: String, $date: Date, $task:String, $user: String, $group: String, $project: String) {
    createTimeTask(time: $time, timecomment:$timecomment, date: $date, task: $task, user: $user, group: $group project: $project) {
        time
        timecomment
        date
        task {
            tasktitle
        }
                group {
            _id
            grouptitle
        }
        project {
            _id
            projecttitle
        }
        user {
            username
            }
        }
    }
`;

const createPlannedTimeTask = gql`
mutation createPlannedTime($time: Float!, $date: Date, $createdBy: String, $task: String ) {
    createPlannedTime(time: $time, date: $date, createdBy: $createdBy,task: $task) {
        time
        date
        task {
            _id
            tasktitle
        }
        group {
            _id
            grouptitle
        }
        project {
            _id
            projecttitle
        }
    }
}
`;

const timeByUser = gql`
 query timeByUser($user: String!){
  timeByUser(user: $user) {
    _id
    time
    date
    task {
        _id
        tasktitle
        tasktime {
            time
        }
    }
    group {
        _id
        grouptitle
    }
    project {
        _id
        projecttitle
    }
    }
}
 `;

export {createTaskTime, createPlannedTimeTask, timeByUser};