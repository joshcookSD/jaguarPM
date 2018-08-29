
import React, {Component} from 'react';
import ProjectTimeCards from './ProjectTimeCards'
import ProjectTimeModal from './ProjectTimeModal'


class ProjectTimeMain extends Component {

    render () {
        return(
            <div>
                <ProjectTimeModal data={this.props.data}/>
                <ProjectTimeCards data={this.props.data}/>
            </div>
        )
    }
}

export default ProjectTimeMain;