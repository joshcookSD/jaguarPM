import React, {Component} from 'react';
import ProjectTimeMain from './ProjectTimeMain'
import ProjectRequirementsMain from './ProjectRequirementsMain'

class ProjectPagePanes extends Component {
    state = {
        selectedProject:''
    };

    render () {
        console.log(this.props.selectedProject);
        if(this.props.activePageTab === 'requirements') {
            return (
                <div>
                    <ProjectRequirementsMain data={this.props.data}/>
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
                    <ProjectTimeMain data={this.props.data} selectedProject={this.props.selectedProject}/>
                </div>
            );
        }
    }
}

export default ProjectPagePanes;
