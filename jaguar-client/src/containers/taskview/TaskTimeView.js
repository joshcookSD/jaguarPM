import React, {Component} from 'react';
import moment from 'moment';
import TimeDay from './taskscomponents/TimeDay';
import {Section} from '../layout/Section';
import styled from 'styled-components';

const TimeView = styled.div`
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
`;


class TaskTimeView extends Component {
    state = {
        weekSelected: {key: '2018-08-12', text: 'Week of August 12, 2018', value: '2018-08-12'},
    };
    selectWeek = (week) => {
        this.setState({weekSelected: week});
    };
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
            <TimeView>
                {selectedWeekArray.map(day => (<Section><TimeDay day={day} user={user}/></Section>))}
            </TimeView>
        )
    }
}

export default TaskTimeView;
