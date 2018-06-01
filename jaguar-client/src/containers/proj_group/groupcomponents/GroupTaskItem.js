import React, {Component} from 'react';
import { List } from 'semantic-ui-react';

class ProjectItem extends Component {

    handleClick() {
        this.props.selectGroup(this.props.groupId);
    }

    render() {
        const {groupId, grouptitle, groupdescription} = this.props;

        return(
            <List.Item
                className="listItem"
                key={groupId}
                onClick={(e) => this.handleClick(e)}
            >
                <List.Icon color='blue' name='cubes' size='large' verticalAlign='middle'/>
                <List.Content>
                    <List.Header>{grouptitle}</List.Header>
                    <List.Description>{groupdescription}</List.Description>
                </List.Content>
            </List.Item>
        )
    }
}

export default ProjectItem




