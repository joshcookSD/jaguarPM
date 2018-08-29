import React, {Component} from 'react';
import ProjectTimeMain from './ProjectTimeMain'

class ProjectPagePanes extends Component {

    render () {
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
                    <ProjectTimeMain data={this.props.data}/>
                </div>
            );
        }
    }
}

export default ProjectPagePanes;
