import React, {Component} from 'react';

class TeamPageDetails extends Component{

    render() {

        const numberOfProjects = this.props.team.projects.length;
        const numberOfProjectscompleted = this.props.team.projects.filter((project, i) => project.iscompleted === true).length;

        return (
            <div>
                <span>{numberOfProjectscompleted} of {numberOfProjects} projects completed</span>
                <br />
            </div>
        )
    }
}


export default TeamPageDetails;


