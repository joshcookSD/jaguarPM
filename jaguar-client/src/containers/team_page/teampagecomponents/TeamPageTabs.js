import React, {Component} from 'react';
import {
    NavItems,
    NavItemContainer,
} from '../../layout/Proj_GroupComponents.js'
import { Icon } from 'semantic-ui-react'

const activeStyle = {
    'background-color': 'rgb(224, 225, 226)',
    'border-right-color' : 'rgb(199, 199, 199',
    'border-right-style': 'solid'
};

class TeamPageTabs extends Component {

    handleClick = (view) => {
        this.props.changeView(view);
    };

    render() {
        const {activePageTab} = this.props;

        return (
            <NavItemContainer>
                {[<Icon size='large' name='feed' value='feed' />,<Icon size='large' name='chart bar outline' value='progress' />,<Icon size='large' name='clock' value='project' />].map((view) => (
                    <NavItems key={view.props.value} onClick={ () => this.handleClick(view.props.value)} style={activePageTab === view.props.value ? activeStyle : {} }>{view}</NavItems>
                ))}
            </NavItemContainer>
        )
    }
}



export default TeamPageTabs;



