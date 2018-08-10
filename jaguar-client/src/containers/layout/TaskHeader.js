import React, {Component} from 'react';
import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';

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
  cursor: pointer;
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

class TaskHeader extends Component {

    handleClick = (view) => {
        this.props.changeView(view);
    };

    render() {
        const {activeView, user} = this.props;

        return (
            <HeaderWrapper>
                {['plan', 'grid', 'other'].map((view) => (
                    <NavItems key={view} onClick={() => this.handleClick(view)} style={activeView === view ? activeStyle : {}}>{view}</NavItems>
                ))}
                <div/>
                <HeaderMenu user={user}/>
            </HeaderWrapper>
        )
    }
}

export default TaskHeader;