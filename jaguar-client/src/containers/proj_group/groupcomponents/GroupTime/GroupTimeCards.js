import React, {Component} from 'react';
import { Card, Progress,Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import GroupTimeCard from './GroupTimeCard'
import GroupPlannedTimeCard from './GroupPlannedTimeCard'
import GroupTotalPlannedTimeRemainingCard from './GroupTotalPlannedTimeRemainingCard'
import GroupTimeBarCharts from './GroupTimeBarCharts'

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
        // if(!this.props.data.group.tasks.length > 0 ) {
        //     return (
        //         <div>
        //          no tasks :[
        //         </div>
        //     );
        // } else {
            //total task hours
            let totalTaskTimeWorked = this.props.data.group.tasks.map((task) => task.tasktime.map(taskt => taskt.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0);
            //total group hours
            let totalGroupTimeWorked = (this.props.data.group.grouptime || []).map(gt => gt.time).reduce((x, y) => x + y, 0);

            //total task time planned
            let totalTaskTimePlanned = this.props.data.group.tasks.map((task) => task.taskplannedtime.map(taskpt => taskpt.time).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0);
            //total group time planned
            let totalGroupTimePlanned = this.props.data.group.groupplannedtime.map(gpt => gpt.time).reduce((x, y) => x + y, 0);

            let totalTimeForGroup = totalTaskTimeWorked + totalGroupTimeWorked ;
            let totalTimePlannedForGroup = totalTaskTimePlanned+ totalGroupTimePlanned;
            let groupHoursLeft = totalTimePlannedForGroup - totalTimeForGroup;

            let allTasks = this.props.data.group.tasks.length;
            let completedTasks = this.props.data.group.tasks.filter(task => task.iscompleted === true).length;
            console.log(this.props.selectedGroup)
            let tasksList = (this.props.data.group.tasks || []).map((task, i) => ((
                <div>
                    <TaskListTimeWrapper  onClick={() => this.handleClick(i)}>
                        <DropArrowWrapper>
                            {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) ? <Icon name='angle down' /> :<Icon name='angle right' /> }
                            <div >{task.tasktitle}</div>
                        </DropArrowWrapper>
                        <div>{(task.tasktime || []).map(task => task.time).reduce((x, y) => x + y, 0)}</div>
                    </TaskListTimeWrapper>
                    {this.state.taskTimeDropedDown && (this.state.taskTimeDropedDownIndex === i) &&
                    <UserTimePerTask>
                        <div>{task.tasktime.map(x => <div>{x.user.username}</div> )}</div>
                        <div>{task.tasktime.map(x => <div>{x.time}</div>)}</div>
                    </UserTimePerTask>
                    }
                </div>
            )));
            return (
                <div>
                    <Card.Group itemsPerRow={3}>
                        <GroupTimeCard variables={{group: this.props.selectedGroup}}/>
                        <GroupPlannedTimeCard variables={{group: this.props.selectedGroup}}/>
                        <GroupTotalPlannedTimeRemainingCard variables={{group: this.props.selectedGroup}}/>
                    </Card.Group>

                    <GroupTimeBarCharts selectedGroup={this.props.selectedGroup}/>
                    <div>{tasksList}</div>
                </div>
            )
        }
    // }
}

export default GroupTimeCards;
