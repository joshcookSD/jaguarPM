import React, {Component} from 'react';
import HeaderMenu from '../../../layout/HeaderMenu';
import {
    HeaderWrapper,
    IconWrapper,
    HeaderGrid,
    NavItems
} from '../../../layout/TopNavBar.js'

const activeStyle = {
    borderBottomStyle: 'solid',
    borderBottomWidth: 5+'px',
    borderBottomColor: 'white',
};

class TeamAdminPageNavTabs extends Component {
    handleClick = (team) => {
        this.props.changeView(team);
    };

    render() {
        const {activeView, data } = this.props;
        return (
            <HeaderWrapper>
                <HeaderGrid>
                    {(data.teamsByOwner || []).map((team, i) => (
                        <NavItems
                            key={i}
                            onClick={ () => this.handleClick(team)}
                            style={activeView === team ? activeStyle : {} }>
                            {team.teamtitle}
                        </NavItems>
                    ))}
                </HeaderGrid>
                    <IconWrapper>
                        <HeaderMenu user={this.props.user}/>
                    </IconWrapper>
            </HeaderWrapper>
        )
    }
}

export default TeamAdminPageNavTabs;