import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import GroupTaskComplete from './GroupTaskComplete';
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

const TaskDescript = styled.div`
    padding-left: 10px;
`;

const InnerGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%
    justify-content: space-between;
`;

const TaskTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    &:hover  {
    background-color: #e6fff1
    border-radius: .28571429rem;
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

    render() {
        console.log(this.props.selectedGroup)
        return (
            <Query query={groupDetails} variables={{_id: this.props.selectedGroup}}>
                {({loading, error, data}) => {
                    return (
                        <div>
                            <InnerGroupWrapper>
                                { data.group.tasks.map((task, i) =>
                                    <TaskTitleWrapper>
                                        <div onClick={() => this.handleClick(i)}>
                                            <div>{task.tasktitle}</div>
                                            {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) && <TaskDescript>{task.taskdescription}</TaskDescript>}
                                        </div>
                                        {
                                            (task.iscompleted === true)
                                                ?
                                                <Icon name='check circle' color='green' size='large'/>
                                                :
                                                <GroupTaskComplete
                                                    taskGroupId={task.group._id}
                                                    taskId={task._id}
                                                    i={i}
                                                    selectedGroup={this.props.selectedGroup}
                                                />
                                        }
                                    </TaskTitleWrapper>
                                )}
                            </InnerGroupWrapper>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default GroupTaskList