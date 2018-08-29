import React, {Component} from 'react';
import { Card, Progress,Header } from 'semantic-ui-react';

class GroupTimeCards extends Component {

    render () {
        if(!this.props.data.group.tasks.length > 0) {
            return (
                <div>
                 no tasks :[
                </div>
            );
        } else {
            //Total task hours
            let tasktime = (this.props.data.group.tasks || []).map((task) => ((task.tasktime || []).map(task => task.time).reduce((x, y) => x + y, 0)));
            tasktime = tasktime.reduce((x, y) => x + y, 0)
            //total planned hours
            let taskPlannedTime = (this.props.data.group.tasks || []).map((task) => (task.taskplannedtime || []).map(tasktimes => tasktimes.time).reduce((x, y) => x + y, 0));
            taskPlannedTime = taskPlannedTime.reduce((x, y) => x + y, 0)
            //hours left of group
            let hoursLeft = taskPlannedTime - tasktime;
            let timeRemainingPercentage = (tasktime / taskPlannedTime) * 100;
            let tasksRemaining = ((this.props.data.group.tasks.filter(task => task.iscompleted === true).length) / (this.props.data.group.tasks.length)) * 100
            return (
                <div>
                    <Card.Group itemsPerRow={3}>
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header>total time worked</Card.Header>
                                <Card.Description>
                                    <Header as='h2'>{tasktime}</Header>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header>total time planned</Card.Header>
                                <Card.Description>
                                    <Header as='h2'>{taskPlannedTime}</Header>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header>total hours left</Card.Header>
                                <Card.Description>
                                    <Header as='h2'>{hoursLeft}</Header>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                    <Header as='h3'>Time Remaining</Header>
                    <Progress percent={isNaN(timeRemainingPercentage) ? 0 : timeRemainingPercentage} progress
                              precision/>
                    <Header as='h3'>Tasks Remaining</Header>
                    <Progress percent={isNaN(tasksRemaining) ? 0 : tasksRemaining} progress precision/>
                </div>
            )
        }
    }
}

export default GroupTimeCards;

