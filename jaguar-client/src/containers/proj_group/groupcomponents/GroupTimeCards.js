import React, {Component} from 'react';
import { Card } from 'semantic-ui-react';

class GroupTimeCards extends Component {

    render () {
        console.log(this.props.data)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const tasktime = this.props.data.group.tasks.map((task) => task.tasktime.map(tasktimes => tasktimes.time))
        console.log(tasktime[0].reduce(reducer))

        return(
            <div>

            </div>
        )
    }
}

export default GroupTimeCards;