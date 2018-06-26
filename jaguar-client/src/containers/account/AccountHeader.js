import React, {Component} from 'react';
import styled from 'styled-components';
import HeaderMenu from '../layout/HeaderMenu';

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
  grid-row: 1;
  background-color: black;
  color: white;
  padding-top: .4em;
  padding-right: 1em;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 70px 70px 70px auto 50px;
`;

const NavItems = styled.div`
  max-width: 100px; 
  min-width: 70px;
  height: 100%;
  line-height: 40px;
  margin: 0 15px 0 15px;
  text-align: center;
  color: white;
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

class AccountHeader extends Component {

    handleClick = (view) => {
        this.props.changeView(view);
    };

    render() {
        const {activeView} = this.props;

        return (
            <HeaderWrapper>
                {['info', 'account', 'organizations'].map((view) => (
                    <NavItems key={view} onClick={() => this.handleClick(view)} style={activeView === view ? activeStyle : {}}>{view}</NavItems>
                ))}
                <div/>
                <HeaderMenu/>
            </HeaderWrapper>
        )
    }
}

export default AccountHeader;