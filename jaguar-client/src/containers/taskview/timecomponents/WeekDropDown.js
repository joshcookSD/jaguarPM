import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';

class WeekDropDown extends Component {
    state = {
        weekSelected: {key: '2018-08-12', text: 'Week of August 12, 2018', value: '2018-08-12'},
    };
    render() {
        const {weekOptions, weekSelected} = this.props;
        const {} = this.state;

        return (
            <Dropdown text={weekSelected.text} fluid scrolling floating labeled button className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Header content='New Group'/>
                    {weekOptions.map((option, i) =>
                        <Dropdown.Item
                            key={i}
                            value={option.value}
                            {...option}
                            onClick={() => this.selectWeek(option)}
                        />)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default WeekDropDown;
