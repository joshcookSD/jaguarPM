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
 {
  task {
    _id
    tasktitle
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
 query tasksByDay($taskcurrentowner: String!, $iscompleted: Boolean, $plandate: String){
  tasksByDay(taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate) {
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

const tasksToday = gql`
 query tasksToday($taskcurrentowner: String!, $iscompleted: Boolean, $plandate: String){
  tasksToday(taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate) {
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

const tasksByTeam = gql`
 query tasksByTeam($iscompleted: Boolean, $team: String){
  tasksByTeam(iscompleted: $iscompleted, team: $team) {
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

const createTask = gql`
mutation createTask($tasktitle: String, $taskcurrentowner: String, $plandate: String, $iscompleted: Boolean) {
    createTask(tasktitle: $tasktitle, taskcurrentowner: $taskcurrentowner, plandate: $plandate, iscompleted: $iscompleted) {
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

const completeTask = gql`
mutation completeTask($_id: String!, $iscompleted: Boolean, $completeddate:String) {
    completeTask(_id: $_id, iscompleted: $iscompleted, completeddate: $completeddate) {
        _id
        completeddate
        iscompleted
        }
    }
`;

export {allTasks, task, tasksByUser, createTask, tasksToday, tasksByDay, completeTask}