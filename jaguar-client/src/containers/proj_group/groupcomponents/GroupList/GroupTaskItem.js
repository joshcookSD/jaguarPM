import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
import styled from 'styled-components';
const ListItemWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;    
    padding-left: 5px;
    padding-right: 5px;
    align-items: center;
`;

class ProjectItem extends Component {

    handleClick() {
        this.props.selectGroup(this.props.groupId);
    }

    render() {
        const {groupId, grouptitle, groupdescription} = this.props;
        return(
            <ListItemWrapper
                className="listItem"
                key={groupId}
                onClick={(e) => this.handleClick(e)}
            >
                <List.Icon color='blue' name='cubes' size='large' verticalAlign='middle'/>
                <List.Content>
                    <List.Header>{grouptitle}</List.Header>
                    <List.Description>{groupdescription}</List.Description>
                </List.Content>
            </ListItemWrapper>
        )
    }
}

export default ProjectItem




