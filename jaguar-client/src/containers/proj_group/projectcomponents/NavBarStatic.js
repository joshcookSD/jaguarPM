import React, {Component} from 'react';
import HeaderMenu from '../../layout/HeaderMenu';
import {HeaderWrapper, IconWrapper, HeaderGrid,} from '../../layout/TopNavBar.js'

class TeamAdminPageNavTabs extends Component {
    render() {
        return (
            <HeaderWrapper>
                <HeaderGrid>
                </HeaderGrid>
                <IconWrapper>
                    <HeaderMenu user={this.props.user}/>
                </IconWrapper>
            </HeaderWrapper>
        )
    }
}

export default TeamAdminPageNavTabs;