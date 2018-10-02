import React, {Component} from 'react';
import { Loading } from 'semantic-ui-react';
import ProjectRequirementModal from './ProjectRequirementModal'
import RequirementList from "./RequirementList";

class ProjectRequirementsMain extends Component {
    openReqModal = () => this.setState({reqModalOpen: true});
    closeReqModal = () => this.setState({reqModalOpen: false});
    render () {
        return (
            <div>
                <ProjectRequirementModal
                    selectedProject={ this.props.selectedProject }
                    reqOpen={this.openReqModal}
                    reqClose={this.closeReqModal}
                />
                <RequirementList
                    selectedProject={ this.props.selectedProject }
                />
            </div>
        )
    }
}

export default ProjectRequirementsMain;

