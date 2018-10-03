import React, {Component} from 'react';
import { Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import GroupTimeCard from './GroupTimeCard'
import GroupPlannedTimeCard from './GroupPlannedTimeCard'
import GroupTotalPlannedTimeRemainingCard from './GroupTotalPlannedTimeRemainingCard'
import GroupTimeBarCharts from './GroupTimeBarCharts'
import gql from "graphql-tag";
import { Query } from "react-apollo";

const groupDetails = gql`
query group($_id: String!) {
  group(_id: $_id) {
    _id
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


const TaskListTimeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    background: #e0e1e2;
    border-radius: .28571429rem;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;

`;
const DropArrowWrapper = styled.div`
display:flex;
justify-content: start;
`;

const UserTimePerTask = styled.div`
    display: flex;
    justify-content: space-between;
     width: 90%;
    padding-left: 10%;
    padding-right: 10%;
    background: #e6fff1;
    border-radius: .28571429rem;
    
`;

class GroupTimeCards extends Component {

    state = {
      taskTimeDropedDown: false,
      taskTimeDropedDownIndex: '',
    };

    handleClick = (i) => {
        this.setState({taskTimeDropedDown:!this.state.taskTimeDropedDown})
        this.setState({taskTimeDropedDownIndex:i})
    };

    render () {
        return (
            <Query query={groupDetails} variables={{_id: this.props.selectedGroup}}>
                {({loading, error, data}) => {
                    if (error) return <p>No Project Selected</p>;
                    return (
                        <div>
                            <Card.Group itemsPerRow={3}>
                                <GroupTimeCard variables={{group: this.props.selectedGroup}}/>
                                <GroupPlannedTimeCard variables={{group: this.props.selectedGroup}}/>
                                <GroupTotalPlannedTimeRemainingCard variables={{group: this.props.selectedGroup}}/>
                            </Card.Group>
                            <GroupTimeBarCharts selectedGroup={this.props.selectedGroup}/>
                            {(data.group.tasks || []).map((task, i) => ((
                                <div>
                                    {console.log(data)}
                                    <TaskListTimeWrapper  onClick={() => this.handleClick(i)}>
                                        <DropArrowWrapper>
                                            {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) ? <Icon name='angle down' /> :<Icon name='angle right' /> }
                                            <div >{task.tasktitle}</div>
                                        </DropArrowWrapper>
                                        <div>{(task.tasktime || []).map(task => task.time).reduce((x, y) => x + y, 0)}</div>
                                    </TaskListTimeWrapper>
                                    {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) &&
                                    <UserTimePerTask>
                                        <div>{task.tasktime.map(x => <div>user: { "" + x.user.username}</div> )}</div>
                                        <div>{task.tasktime.map(x => <div>time:  { "" +x.time}</div>)}</div>
                                    </UserTimePerTask>
                                    }
                                </div>
                            )))}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default GroupTimeCards;

