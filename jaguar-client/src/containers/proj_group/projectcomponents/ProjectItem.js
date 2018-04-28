import React, {Component} from 'react';
import { List } from 'semantic-ui-react';


class ProjectItem extends Component {

    render() {
        const {projectId, projecttitle, projectdescription} = this.props;

        return(
            <List.Item key={projectId} >
                <List.Icon color='blue' name='cubes' size='large' verticalAlign='middle'/>
                <List.Content>
                    <List.Header>{projecttitle}</List.Header>
                    <List.Description>{projectdescription}</List.Description>
                </List.Content>
            </List.Item>
        )
    }
}



export default ProjectItem;