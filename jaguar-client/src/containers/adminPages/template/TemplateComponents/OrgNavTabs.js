import React, {Component} from 'react';
import styled from 'styled-components';
import decode from "jwt-decode";
import HeaderMenu from '../../../layout/HeaderMenu';
import {getOrgByOwner} from "../../../apollo-graphql/userQueries";

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  background-color: black;
  display: flex;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 5%
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrgIconWrapper = styled.div`
  width: 5%
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderGrid = styled.div`

  display: flex;
  height: 100%
  width: 95%
  padding-left: 1em;
  overflow: auto;
`;

const NavItems = styled.div`
  max-width: 70px; 
  min-width: 70px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  &:hover {
    border-style: solid;
    border-width: 0 0 5px 0;
    border-color: #767676;
  }
`;

const activeStyle = {
    borderBottomStyle: 'solid',
    borderBottomWidth: 5+'px',
    borderBottomColor: 'white',
};

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;
const variables = { owner: userId };

class OrgNavTabs extends Component {
    handleClick = (org) => {
        this.props.changeView(org);
    };

    render() {
        const {activeView, data } = this.props;
        {console.log(activeView)}
        return (
            <HeaderWrapper>
                <HeaderGrid>
                    {(data.getOrgByOwner || []).map((org, i) => (
                        <NavItems
                            key={i}
                            //on click of nav tab send team object to main which sets state as team object
                            onClick={ () => this.handleClick(org)}
                            //if active view is equal to org give it style else nothing
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