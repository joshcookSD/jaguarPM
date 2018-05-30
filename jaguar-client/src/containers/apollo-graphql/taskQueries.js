import gql from "graphql-tag";

const allTasks= gql`
 {
  allTasks {
    _id
    tasktitle
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;

const task = gql`
 query task($_id: String!){
  task(_id: $_id) {
    _id
    tasktitle
    taskdescription
    taskstatus
    iscompleted
    plandate
    duedate
    completeddate
    createdAt
    priority{
        _id
        priority
        }
    group {
        _id
        grouptitle
        }
    team {
        _id
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;
const tasksByUser = gql`
 query tasksByUser($taskcurrentowner: String!, $iscompleted: Boolean){
  tasksByUser(taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted) {
    _id
    tasktitle
    iscompleted
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;

const tasksByDay = gql`
 query tasksByDay($taskcurrentowner: String!, $iscompleted: Boolean, $plandate: Date){
  tasksByDay(taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate) {
    _id
    tasktitle
    iscompleted
    plandate
    duedate
    group {
        grouptitle
    }
    project {
        projecttitle
    }
    team {
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
    tasktime {
        time
    }
  }
}
 `;

const tasksToday = gql`
 query tasksToday($taskcurrentowner: String!, $iscompleted: Boolean, $plandate: Date){
  tasksToday(taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate) {
    _id
    tasktitle
    iscompleted
    plandate
    duedate
    group {
        grouptitle
    }
    project {
        projecttitle
    }
    team {
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
    tasktime {
        time
    }
  }
}
 `;

const tasksByTeam = gql`
 query tasksByTeam($iscompleted: Boolean, $team: String){
  tasksByTeam(iscompleted: $iscompleted, team: $team) {
    _id
    tasktitle
    iscompleted
    plandate
    duedate
    group {
        grouptitle
    }
    project {
        projecttitle
    }
    team {
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
    tasktime {
        time
    }
  }
}
 `;

const createTask = gql`
mutation createTask($tasktitle: String, $taskcurrentowner: String, $plandate: Date, $iscompleted: Boolean, $team: String) {
    createTask(tasktitle: $tasktitle, taskcurrentowner: $taskcurrentowner, plandate: $plandate, iscompleted: $iscompleted, team: $team) {
        _id
        tasktitle
        iscompleted
        plandate
        taskcurrentowner {
          _id
          username
            }
        }
    }
`;

const updateTask = gql`
mutation updateTask($_id: String, $tasktitle: String, $taskdescription: String, $taskcurrentowner: String, $iscompleted: Boolean, $plandate: Date, , $duedate: Date) {
    updateTask(_id: $_id, tasktitle: $tasktitle, taskdescription: $taskdescription, taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate, duedate: $duedate) {
        _id
        tasktitle
        taskdescription
        plandate
        duedate
        taskcurrentowner {
          _id
          username
            }
        }
    }
`;

const completeTask = gql`
mutation completeTask($_id: String!, $iscompleted: Boolean, $completeddate:Date) {
    completeTask(_id: $_id, iscompleted: $iscompleted, completeddate: $completeddate) {
        _id
        completeddate
        iscompleted  
        }
    }
`;

const removeTask = gql`
mutation removeTask($_id: String!) {
    removeTask(_id: $_id) {
        _id
        }
    }
`;

export {allTasks, task, tasksByUser, createTask, tasksToday, tasksByDay, tasksByTeam, completeTask, updateTask, removeTask}