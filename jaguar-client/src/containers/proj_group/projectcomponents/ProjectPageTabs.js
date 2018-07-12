import React, {Component} from 'react';
import {
    NavItems,
    NavItemContainer,
} from '../../layout/Proj_GroupComponents.js'


const activeStyle = {
    'background-color': 'rgb(224, 225, 226)',
    'border-right-color' : 'rgb(199, 199, 199',
    'border-right-style': 'solid'
};

class ProjectPageTabs extends Component {

    handleClick = (view) => {
        this.props.changeView(view);
    };

    render() {
        const {activePageTab} = this.props;

        return (
            <NavItemContainer>
                {['feed', 'progress', 'project'].map((view) => (
                    <NavItems key={view} onClick={ () => this.handleClick(view)} style={activePageTab === view ? activeStyle : {} }>{view}</NavItems>
                ))}
            </NavItemContainer>
        )
    }
}



export default ProjectPageTabs;


