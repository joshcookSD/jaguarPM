
import React, {Component} from 'react';
import ProjectTimeCards from './ProjectTimeCards'
import ProjectTimeModal from './ProjectTimeModal'


class ProjectTimeMain extends Component {
    state = {
        selectedProject:''
    };

    render () {
        return(
            <div>
                <ProjectTimeModal data={this.props.data}/>
                <ProjectTimeCards
                    data={this.props.data}
                    selectedProject={this.props.selectedProject}
                />
            </div>
        )
    }
}

export default ProjectTimeMain;