import React, {Component} from 'react';

class TeamPageDetails extends Component {

    render(){
            return (
                <div>
                    hello
                    {console.log(this.props.activeView.owner.username)}
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
                </div>
            )
        }
    // }
}


export default TeamPageDetails;