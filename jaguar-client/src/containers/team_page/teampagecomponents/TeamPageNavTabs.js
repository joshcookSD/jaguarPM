import React, {Component} from 'react';
import styled from 'styled-components';
import HeaderMenu from '../../layout/HeaderMenu';
import {
    HeaderWrapper,
    IconWrapper,
    HeaderGrid,
    NavItems
} from '../../layout/TopNavBar.js'


const activeStyle = {
    borderBottomStyle: 'solid',
    borderBottomWidth: 5+'px',
    borderBottomColor: 'white',
};

class TeamPageNavTabs extends Component {
    handleClick = (team) => {
        this.props.changeView(team);
    };

    render() {
        const {activeView, data } = this.props;
        return (
            <HeaderWrapper>
                <HeaderGrid>
                    {(data.teamsByUser || []).map((team, i) => (
                        <NavItems
                            key={i}
                            onClick={ () => this.handleClick(team)}
                            style={activeView === team ? activeStyle : {} }>
                            {team.teamtitle}
                        </NavItems>
                    ))}
                </HeaderGrid>
                    <IconWrapper>
                        <HeaderMenu/>
                    </IconWrapper>
            </HeaderWrapper>
        )
    }
}

export default TeamPageNavTabs;