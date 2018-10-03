import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Icon } from 'semantic-ui-react';
import moment from "moment/moment";
import gql from "graphql-tag";

const groupDetails = gql`
query group($_id: String!) {
  group(_id: $_id) {
    _id
    grouptitle
    groupdescription
    tasks {
      _id
      iscompleted
      tasktitle
      taskdescription
          taskplannedtime{
            time
          }
        tasktime{
        time
            user{
            username
                time{
                time
                }
            }
        }
      group{
        _id
        }
      __typename
    }
    __typename
  }
}`;

const completeTask = gql`
mutation completeTask($_id: String!, $iscompleted: Boolean, $completeddate:Date, $groupForTasksId: String!) {
    completeTask(_id: $_id, iscompleted: $iscompleted, completeddate: $completeddate, groupForTasksId: $groupForTasksId) {
        _id
        completeddate
        iscompleted  
        }
    }
`;

class GroupTaskList extends Component {
    state = {
        groupId: '',
        taskTimeDropedDown: false,
        taskTimeDropedDownIndex: '',
        hovering: false,
        hoveringSquare: false,
        hoveringSquareindex: ''
    };

    handleClick = (i) => {
        this.setState({taskTimeDropedDown:!this.state.taskTimeDropedDown});
        this.setState({taskTimeDropedDownIndex:i});
    };

    onEnterSquare = (i) => this.setState({ hoveringSquare: true, hoveringSquareindex: i });
    onExitSquare = () => this.setState({ hoveringSquare: false, hoveringSquareindex: '' });

    render() {

        const { taskGroupId, taskId, i, selectedGroup} = this.props;
        const today = moment(Date.now()).format('YYYY-MM-DD');

        return (
            <Mutation mutation={completeTask}>
                {(completeTask) => {
                    return (
                        <Icon
                            name='square outline'
                            onMouseEnter={() => this.onEnterSquare(i)}
                            onMouseLeave={this.onExitSquare}
                            color={this.state.hoveringSquare && this.state.hoveringSquareindex === i ? 'blue' : 'green'}
                            size='large'
                            onClick={async e => {
                                e.preventDefault();
                                await completeTask({
                                    variables: {
                                        _id: taskId,
                                        iscompleted: true,
                                        completeddate: today,
                                        groupForTasksId: taskGroupId
                                    },
                                    update: async (store) => {
                                        let { group } = store.readQuery({query: groupDetails, variables: {_id: selectedGroup} });
                                        let completedTask = group.tasks.find(taskk => taskk._id === taskId );
                                        completedTask.iscompleted = !completedTask.iscompleted;
                                        await store.writeQuery({
                                            query: groupDetails,
                                            variables: {_id: selectedGroup},
                                            data: { group }
                                        });
                                    }
                                });
                            }}
                        />
                    )
                }}
            </Mutation>
        )
    }
}

export default GroupTaskList