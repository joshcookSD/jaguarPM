import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import moment from 'moment';
import {Dropdown, Icon, Dimmer, Loader } from 'semantic-ui-react';
import TimeDay from './timecomponents/TimeDay';
import styled from 'styled-components';
import TimeDay from './timecomponents/TimeDay';


export const userTime = gql`
query user($_id: String ){
    user(_id: $_id){
        time {
            _id
            time
            date
            task {
                _id
                tasktitle
            }
            group {
                _id
                grouptitle
            }
            project {
                _id
                projecttitle
            }
            team {
                _id
                teamtitle
            }
        }
        team {
            _id
            teamtitle
            defaultproject{
                _id
                projecttitle
                defaultgroup{
                    _id
                    grouptitle
                }
            }
        }
    }
}`;

const TimeView = styled.div`
    display: grid;
    grid-template-rows: 35px 400px 1fr;
    margin: 0.5em;
`;

const TimeDayRow = styled.div`
    grid-row-start: 2;
    grid-row-end: 2;
    display: flex
    justify-content: space-between;
    overflow-x: auto;
    `;

const TimeHeaderRow = styled.div`
    display:flex;
    justify-content: space-between;
`;


const today = moment().isoWeekday(1).format('YYYY-MM-DD');

class TaskTimeView extends Component {
    state = {
        initialWeek: {key: today, text: 'Week of ' + moment(today).format('MMMM Do, YYYY'), value: today},
        selectedWeek: {key: today, text: 'Week of ' + moment(today).format('MMMM Do, YYYY'), value: today},
        beginDate: '2018-07-01',
        includeWeekend: false,
    };
    selectWeek = (week) => {
        this.setState({selectedWeek: week});
    };
    render() {
        const { initialWeek, selectedWeek, beginDate, includeWeekend } = this.state;
        const weekOptions = [];
        for (let date = initialWeek.value; date > beginDate; date = moment(date).add(-7,'day').format('YYYY-MM-DD')){
            weekOptions.push({key: date, text: 'Week of ' + moment(date).format('MMMM Do, YYYY'), value: date})
        }
        const { user, defaultgroup, defaultproject, defaultteam, team, variables} = this.props;
        const selectedWeekArray = [];
        const showDays = includeWeekend ? moment(selectedWeek.value).add(7,'day').format('YYYY-MM-DD') : moment(selectedWeek.value).add(5,'day').format('YYYY-MM-DD');
        for (let day = selectedWeek.value; day < showDays ; day = moment(day).add(1,'day').format('YYYY-MM-DD')) {
            selectedWeekArray.push(moment(day).format('YYYY-MM-DD'))
        }
        const _includeWeekend = () => {
            this.setState({includeWeekend: !includeWeekend});
        };

        return (
            <Query query={userTime} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return (
                        <TimeView>
                            <TimeHeaderRow>
                                <Dropdown text={selectedWeek.text} scrolling floating labeled button className='icon' >
                                    <Dropdown.Menu>
                                        <Dropdown.Header content='Select Week' />
                                        {weekOptions.map((option, i) =>
                                            <Dropdown.Item
                                                key={i}
                                                value={option.value}
                                                {...option}
                                                onClick={() => this.selectWeek(option)}
                                            />)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <span>include weekend:
                                    <Icon
                                        name={includeWeekend ? 'check circle' : 'square outline'}
                                        size='large'
                                        color= 'green'
                                        verticalalign='middle'
                                        style={{
                                            paddingRight: '0.5em',
                                            paddingLeft: '0.25em'
                                        }}
                                        onClick={() => _includeWeekend()}
                                    />
                                </span>
                            </TimeHeaderRow>

                            <TimeDayRow>
                                {selectedWeekArray.map(day =>
                                    (<TimeDay
                                        key={day}
                                        day={day}
                                        user={user}
                                        time={data.user.time}
                                        defaultgroup={defaultgroup}
                                        defaultproject={defaultproject}
                                        defaultteam={defaultteam}
                                        team={data.user.team}
                                        updateQuery={userTime}
                                    />))}
                            </TimeDayRow>
                        </TimeView>
                    )
                }
                }
            </Query>
        )
    }
}

export default TaskTimeView;
