import React, {Component} from 'react';
import moment from 'moment';
import TimeDay from './taskscomponents/TimeDay';

class TaskTimeView extends Component {

    render() {
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { user, selectedWeek } = this.props;
        const selectedWeekArray = [
            selectedWeek,
            moment(selectedWeek).add(1,'day').format('YYYY-MM-DD'),
            moment(selectedWeek).add(2,'day').format('YYYY-MM-DD'),
            moment(selectedWeek).add(3,'day').format('YYYY-MM-DD'),
            moment(selectedWeek).add(4,'day').format('YYYY-MM-DD'),
            moment(selectedWeek).add(5,'day').format('YYYY-MM-DD'),
            moment(selectedWeek).add(6,'day').format('YYYY-MM-DD'),
        ];

        return (
            <div>
            <div>{user.username + ' ' +selectedWeek}</div>
                <list>
                    {selectedWeekArray.map(day => (<TimeDay day={day} user={user}/>))}
                </list>
            </div>
        )
    }
}

export default TaskTimeView;
