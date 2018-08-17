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
    project {
        _id
        projecttitle
        }
    team {
        _id
        teamtitle
        users {
            _id
            username
        }
        projects{
            _id
            projecttitle
            groups {
                _id
                grouptitle
            }
        }
    }
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;
const tasksByUser = gql`
 query tasksByUser($taskcurrentowner: String!){
  tasksByUser(taskcurrentowner: $taskcurrentowner) {
    _id
    tasktitle
    iscompleted
     group {
        _id
        grouptitle
    }
    project {
        _id
        projecttitle
    }
    team {
        _id
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
        tasktime {
        time
    }
    taskplannedtime{
        time
    }
  }
}
 `;
const tasksUnplanned = gql`
 query tasksUnplanned($taskcurrentowner: String!, $iscompleted: Boolean){
  tasksUnplanned(taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted) {
    _id
    tasktitle
    iscompleted
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
    taskplannedtime{
        time
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
        _id
        grouptitle
    }
    project {
        _id
        projecttitle
    }
    team {
        _id
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
    tasktime {
        time
    }
    taskplannedtime{
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
        _id
        grouptitle
    }
    project {
        _id
        projecttitle
    }
    team {
        _id
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
    tasktime {
        time
    }
    taskplannedtime{
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
        _id
        grouptitle
    }
    project {
        _id
        projecttitle
    }
    team {
        _id
        teamtitle
    }
    taskcurrentowner {
      _id
      username
    }
    tasktime {
        time
    }
    taskplannedtime{
        time
    }
  }
}
 `;

const createTask = gql`
mutation createTask($tasktitle: String!, $taskcurrentowner: String, $plandate: Date, $iscompleted: Boolean!, $group:String!, $project:String!, $team: String!, $dueDate: Date ) {
    createTask(tasktitle: $tasktitle, taskcurrentowner: $taskcurrentowner, plandate: $plandate, iscompleted: $iscompleted, group: $group, project: $project, team: $team, dueDate: $dueDate) {
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
mutation updateTask($_id: String, $tasktitle: String, $taskdescription: String, $taskcurrentowner: String, $iscompleted: Boolean, $plandate: Date, , $duedate: Date, $taskGroupId: String) {
    updateTask(_id: $_id, tasktitle: $tasktitle, taskdescription: $taskdescription, taskcurrentowner: $taskcurrentowner, iscompleted: $iscompleted, plandate: $plandate, duedate: $duedate, taskGroupId: $taskGroupId) {
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

const updateTaskTeam = gql`
mutation updateTaskTeam($_id: String, $team: String, $project: String, $group: String) {
    updateTaskTeam(_id: $_id, team: $team, project: $project, group: $group) {
        _id
        team {
            _id
            teamtitle
        }
        project {
            _id
            projecttitle
        }
        group {
            _id
            grouptitle
        }
        }
    }
`;

const updateTaskProject = gql`
mutation updateTaskProject($_id: String, $project: String, $group: String) {
    updateTaskProject(_id: $_id, project: $project, group: $group) {
        _id
        team {
            _id
            teamtitle
        }
        project {
            _id
            projecttitle
        }
        group {
            _id
            grouptitle
        }
        }
    }
`;

const updateTaskGroup = gql`
mutation updateTaskGroup($_id: String, $group: String) {
    updateTaskGroup(_id: $_id, group: $group) {
        _id
        team {
            _id
            teamtitle
        }
        project {
            _id
            projecttitle
        }
        group {
            _id
            grouptitle
        }
        }
    }
`;

const updateTaskUser = gql`
mutation updateTaskUser($_id: String, $taskcurrentowner: String) {
    updateTaskUser(_id: $_id, taskcurrentowner: $taskcurrentowner) {
        _id
        team {
            _id
            teamtitle
        }
        project {
            _id
            projecttitle
        }
        taskcurrentowner {
            _id
            username
        }
        }
    }
`;

const completeTask = gql`
mutation completeTask($_id: String!, $iscompleted: Boolean, $completeddate:Date, $groupForTasksId: String!) {
    completeTask(_id: $_id, iscompleted: $iscompleted, completeddate: $completeddate, groupForTasksId: $groupForTasksId) {
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

export {allTasks, task, tasksByUser, createTask, tasksToday, tasksByDay, tasksByTeam, completeTask, updateTask, removeTask, updateTaskTeam, updateTaskProject, updateTaskGroup, updateTaskUser, tasksUnplanned}