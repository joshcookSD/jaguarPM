import React, {Component} from 'react';
import { Card } from 'semantic-ui-react';

class GroupTimeCards extends Component {

    render () {
        console.log(this.props.data)

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let tasktime = this.props.data.group.tasks.map((task) => task.tasktime.map(tasktimes => tasktimes.time))
        tasktime = tasktime[0].reduce(reducer);

        let taskPlannedTime = this.props.data.group.tasks.map((task) => task.taskplannedtime.map(tasktimes => tasktimes.time))
        taskPlannedTime = taskPlannedTime[0].reduce(reducer);

        return(
            <div>

            </div>
        )
    }
}

export default GroupTimeCards;