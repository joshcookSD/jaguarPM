import React, {Component} from 'react';
import { Card } from 'semantic-ui-react';
import GroupTimeCard from './GroupTimeCard'
import GroupPlannedTimeCard from './GroupPlannedTimeCard'
import GroupTotalPlannedTimeRemainingCard from './GroupTotalPlannedTimeRemainingCard'
import GroupTimeBarCharts from './GroupTimeBarCharts'
import GroupTimeTaskList from './GroupTimeTaskList';

class GroupTimeCards extends Component {
    render () {
        return (
            <div>
                <Card.Group itemsPerRow={3}>
                    <GroupTimeCard variables={{group: this.props.selectedGroup}}/>
                    <GroupPlannedTimeCard variables={{group: this.props.selectedGroup}}/>
                    <GroupTotalPlannedTimeRemainingCard variables={{group: this.props.selectedGroup}}/>
                </Card.Group>
                <GroupTimeBarCharts selectedGroup={this.props.selectedGroup}/>
                <GroupTimeTaskList selectedGroup={this.props.selectedGroup}/>
            </div>
        )
    }
}

export default GroupTimeCards;

