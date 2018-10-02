import React, {Component} from 'react';
import ProjectTimeMain from './ProjectTime/ProjectTimeMain'
import ProjectRequirementsMain from './ProjectRequirements/ProjectRequirementsMain'

class ProjectPagePanes extends Component {

    render () {
        if(this.props.activePageTab === 'requirements') {
            return (
                <div>
                    <ProjectRequirementsMain
                        selectedProject={ this.props.selectedProject }
                    />
                </div>
            );
        }
        if(this.props.activePageTab === 'feed') {
            return (
                <div>
                    View
                </div>
            );
        }
        if(this.props.activePageTab === 'progress') {
            return (
                <div>
                    {/*<TeamProjectProgress team={this.props.team}/>*/}
                </div>
            );
        }
        if(this.props.activePageTab === 'project') {
            return (
                <div>
                    <ProjectTimeMain
                    data={this.props.data}
                    selectedProject={this.props.selectedProject}
                    />
                </div>
            );
        }
    }
}

export default ProjectPagePanes;
