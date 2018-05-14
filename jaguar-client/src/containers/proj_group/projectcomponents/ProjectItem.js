import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
// import ProjectDetail from './ProjectDetails';


class ProjectItem extends Component {

      handleClick() {
          alert(this.props.projecttitle)
      }

    render() {
        const {projectId, projecttitle, projectdescription} = this.props;

        return(
            <List.Item 
                className="listItem" 
                key={projectId}
                onClick={(e) => this.handleClick(e)}
                >
                <List.Icon color='blue' name='cubes' size='large' verticalAlign='middle'/>
                <List.Content>
                    <List.Header>{projecttitle}</List.Header>
                    <List.Description>{projectdescription}</List.Description>
                </List.Content>
            </List.Item>
        )
    }
}

export default ProjectItem




