import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';

class TeamTimeDropdown extends Component {
    state = {
        selectedTeam: this.props.timeTeam
    };

    render() {
        const { teamOptions} = this.props;
        const { selectedTeam } = this.state;
        const _selectTeam = (team) => {
            this.setState({selectedTeam: team});
            this.props.selectTeam(team);
            this.props.createProjectOptions(team);
            this.props.createGroupOptions(team.defaultproject);
            this.props.createTaskOptions(team.defaultgroup);
        };

        return(
            <Dropdown text={selectedTeam.teamtitle}  fluid scrolling floating labeled button className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Header content='Team' />
                    {(teamOptions || []).map((option, i) =>
                        <Dropdown.Item
                            key={i}
                            value={option._id}
                            {...option}
                            onClick={() => {
                                _selectTeam(option);
                            }}
                        />)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default TeamTimeDropdown;