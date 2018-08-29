import gql from "graphql-tag";

const createTaskTime = gql`
mutation createTimeTask($time: Float!, $timecomment: String, $date: Date, $task:String, $user: String, $group: String, $project: String, $team: String) {
    createTimeTask(time: $time, timecomment:$timecomment, date: $date, task: $task, user: $user, group: $group project: $project, team: $team ) {
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
const createGroupTime = gql`
mutation createGroupTime($time: Float!, $timecomment: String, $date: Date, $task:String, $user: String, $group: String) {
    createGroupTime(time: $time, timecomment:$timecomment, date: $date, task: $task, user: $user, group: $group ) {
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
const createTimeProject = gql`
mutation createTimeProject($time: Float!, $timecomment: String, $date: Date, $user: String, $project: String) {
    createTimeProject(time: $time, timecomment:$timecomment, date: $date, user: $user, project: $project) {
        time
        timecomment
        date
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


const createPlannedTimeGroup = gql`
mutation createPlannedTimeGroup(
    $time: Float!, 
    $date: Date, 
    $createdBy: String, 
    $group: String,
    $task: String 
    $user: String
) {
    createPlannedTimeGroup(
    time: $time, 
    date: $date, 
    createdBy: $createdBy, 
    group: $group
    task: $task
    user: $user
    ) {
        time
        date
        group {
            _id
            grouptitle
        }
    }
}
`;
const createPlannedTimeProject = gql`
mutation createPlannedTime($time: Float!, $date: Date, $createdBy: String, $project: String ) {
    createPlannedTime(time: $time, date: $date, createdBy: $createdBy,project: $project) {
        time
        date
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

export {createTaskTime, createPlannedTimeTask, createTimeProject, createPlannedTimeProject,  createPlannedTimeGroup, createGroupTime, timeByUser};

