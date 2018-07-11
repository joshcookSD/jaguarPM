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

class OrgNavTabs extends Component {
    handleClick = (org) => {
        this.props.changeView(org);
    };

    render() {
        const {activeView, data } = this.props;
        return (
            <HeaderWrapper>
                <HeaderGrid>
                    {(data.getOrgByOwner || []).map((org, i) => (
                        <NavItems
                            key={i}
                            onClick={ () => this.handleClick(org)}
                            style={activeView === org ? activeStyle : {} }>
                            {org.orgtitle}
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

export default OrgNavTabs;