import React, {Component} from 'react';
import styled from 'styled-components';

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

class TeamPageTabs extends Component {

    handleClick = (view) => {
        this.props.changeView(view);
    };

    render() {
        const {activeView} = this.props;

        return (
            <div>
                {['feed', 'progress', 'project'].map((view) => (
                    <NavItems key={view} onClick={ () => this.handleClick(view)} style={activeView === view ? activeStyle : {} }>{view}</NavItems>
                ))}
            </div>
        )
    }
}



export default TeamPageTabs;



