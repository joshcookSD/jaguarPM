import React, {Component} from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {Icon, Modal} from 'semantic-ui-react';
import TimeForm from './TimeForm';

const TimeDayGroup = styled.div`
    width: 100%;
    padding: 1em 0.25em 0.25em 0.25em;
    position: relative;
    min-width: 200px;
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
    align-items: center;
    border-width:2px;
    border-color:rgba(225,245,254 ,1);
    border-style:solid;
    border-radius: 5px;
    color:rgb(21, 27, 38);
    cursor:pointer;
    display:flex;
    justify-content:space-between;
    overflow-x:visible;
    overflow-y:visible;
    padding-bottom:0px;
    padding-left:1em;
    padding-right:1em;
    padding-top:0px;
    position:relative;
    transition-delay:0s;
    transition-duration:0.1s;
    transition-property:box-shadow;
    transition-timing-function:ease-in-out;
    white-space:nowrap;
`;

const UserTime = styled.div`
    align-items:center;
    color:rgb(21, 27, 38);
    cursor:pointer;
    display:flex;
    flex-basis:auto;
    flex-grow:0;
    flex-shrink:1;
    justify-content:flex-end;
    overflow-x:hidden;
    overflow-y:hidden;
    white-space:nowrap;
`;

const NavIcon = styled.i`
    display: inline-block;
    opacity: 1;
    width: auto;
    margin: 0;
    margin-right: 2px;
    margin-left: -.3em;
    height: 1em;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-decoration: inherit;
    text-align: center;
    speak: none;
    font-smoothing: antialiased;
    backface-visibility: hidden;
    line-height: 1;
    vertical-align: middle;
    font-size: 1em;
    color: white;
`;
class TimeDay extends Component {
    state = {
        open: false,
    };

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {
        const { day, time, user, defaultgroup, defaultproject, defaultteam, team} = this.props;
        const { open } = this.state;
        const dayTime = time.filter(time => { return moment.utc(time.date).format('YYYY-MM-DD') === day && time.time !== 0 });
        return (
            <TimeDayGroup>
                <TimeHeader>
                    {moment.utc(day).format('dddd')}, {moment.utc(day).format('M/DD')}
                    <Icon
                        onClick={() => this.show()}
                        link
                        color='green'
                        name='add circle'
                        style={{
                            float: 'right',
                        }}
                    />
                </TimeHeader>
                <TimeTaskList>
                    {dayTime.map( time => (
                        <TimeTask
                            style={{backgroundColor: time.task ? 'rgba(0,0,0,0)':'rgba(129,212,250 ,1)'}}
                            key={time._id}>{time.task ? time.task.tasktitle: <span><NavIcon className='fas fa-cube' /> {time.group.grouptitle}</span>}
                            <UserTime>{time.time}
                            </UserTime>
                        </TimeTask>
                    ))}
                </TimeTaskList>
                <Modal size='small' open={open} onClose={this.close}>
                    <Modal.Header>
                        Time Entry for {day}
                    </Modal.Header>
                    <Modal.Content>
                        <TimeForm
                            userId={user}
                            date={day}
                            defaultgroup={defaultgroup}
                            defaultproject={defaultproject}
                            defaultteam={defaultteam}
                            team={team}
                            updateQuery={this.props.updateQuery}
                            onClose={this.close}
                        />
                    </Modal.Content>
                </Modal>
                <TimeTask style={{fontWeight: 'bold'}}>Total Hours
                    <UserTime>{dayTime.map(({time}) => time).reduce((a, b) => (a + b), 0)}</UserTime>
                </TimeTask>
            </TimeDayGroup>
        )
    }
}

export default TimeDay;