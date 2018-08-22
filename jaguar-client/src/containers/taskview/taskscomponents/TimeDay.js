import React, {Component} from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';

const TimeDayGroup = styled.div`
    width: 100%;
    padding: 1em 0.25em 0.25em 0.25em;
    position: relative;
`;

const TimeTaskList = styled.ul`
    padding: 0;
    margin-top: 0;
    min-height: 300px;
    max-height: 325px;
    list-style-type: none;
    text-align:left;
`;

const TimeHeader = styled.h4`
    color: rgba(0,0,0,0.87);
    display: block;
    font-weight: 700;
    margin-bottom: 0.5rem;
    &:hover {
        background-color: rgb(230, 255, 241);
    }
`;

const TimeTask = styled.li`
    
`;

class TimeDay extends Component {

    render() {
        const { day, time } = this.props;
        const dayTime = time.filter(time => { return moment.utc(time.date).format('YYYY-MM-DD') === day && time.time != 0 });
        return (
            <TimeDayGroup>
                <TimeHeader>
                    {moment.utc(day).format('dddd')}, {moment.utc(day).format('M/DD')}
                    <Icon
                        // onClick={}
                        link
                        color='green'
                        name='add circle'
                        style={{
                            float: 'right',
                        }}
                    />
                </TimeHeader>
                <TimeTaskList>
                    {dayTime.map( time => (<TimeTask key={time._id}>{time.task.tasktitle} {time.time}hrs</TimeTask>))}

                </TimeTaskList>
                <span>
                    Total {dayTime.map(({time}) => time).reduce((a, b) => (a + b), 0)}hrs
                </span>
            </TimeDayGroup>
        )
    }
}

export default TimeDay;