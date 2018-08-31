import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';

class GroupTimeDropdown extends Component {
    state = {
        update: false
    };
    componentWillReceiveProps(nextProps){
        if(this.props.timeGroup._id !== nextProps.timeGroup._id){
            this.setState({
                update: !this.state.update
            });
        }
    }

    render() {
        const { groupOptions, timeGroup} = this.props;
        const _selectGroup = (group) => {
            this.setState({selectedGroup: group});
            this.props.selectGroup(group);
            this.props.createTaskOptions(group);
        };

        return(
            <Dropdown text={timeGroup.grouptitle}  fluid scrolling floating labeled button className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Header content='Group' />
                    {(groupOptions || []).map((option, i) =>
                        <Dropdown.Item
                            key={i}
                            value={option._id}
                            {...option}
                            onClick={() => {
                                _selectGroup(option);
                            }}
                        />)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default GroupTimeDropdown;