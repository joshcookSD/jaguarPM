import React, {Component} from 'react';
import moment from 'moment';
import styled from 'styled-components';
import TaskGroupHeader from './TaskGroupHeader';
import {List, Transition} from "semantic-ui-react";

const TimeDayGroup = styled.div`
    width: 100%;
    padding: 1em;
    position: relative;
`;

class TimeDay extends Component {

    render() {
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { user, day } = this.props;


        return (
            <TimeDayGroup>
                <TaskGroupHeader>{day}</TaskGroupHeader>
                <Transition.Group
                    as={List}
                    duration={200}
                    relaxed
                    size='large'
                    style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingTop: '1em',
                        marginTop: 0,
                        minHeight: '300px',
                        maxHeight: '325px'
                    }}
                >
                    {<li>example time</li>}
                </Transition.Group>
            </TimeDayGroup>
        )
    }
}

export default TimeDay;