
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
                <ProjectTimeModal
                    selectedProject={this.props.selectedProject}
                />
                <ProjectTimeCards
                    selectedProject={this.props.selectedProject}
                />
            </div>
        )
    }
}

export default ProjectTimeMain;