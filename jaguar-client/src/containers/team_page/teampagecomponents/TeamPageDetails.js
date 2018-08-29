import React, {Component} from 'react';
import {
    TeamPageProjectListWrapper
} from '../../layout/Proj_GroupComponents.js'

class TeamPageDetails extends Component {

    render(){
            return (
                <TeamPageProjectListWrapper>
                    {
                        (this.props.activeView.owner.username === null)
                            ? <div> No Owner At This Time </div>
                            : <div> Owned By : {this.props.activeView.owner.username} </div>
                    }
                    {
                        this.props.activeView.projects.map((project, i) => {
                            return (
                                <div>
                                    <ul>
                                        <li>{project.projecttitle}</li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </TeamPageProjectListWrapper>
            )
        }
    // }
}


export default TeamPageDetails;