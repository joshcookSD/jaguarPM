import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
import styled from 'styled-components';

const ListItemWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;    
    padding-left: 5px;
    padding-right: 5px;
    align-items: center;
 &:hover  {
    background-color: #a8efc7;  
    border-radius: .28571429rem;
  }
`;


class ProjectItem extends Component {

     handleClick() {
        this.props.selectProject(this.props.projectId);
    }

    render() {
        const {projectId, projecttitle, projectdescription } = this.props;

        return(
            <ListItemWrapper
                className="listItem" 
                key={projectId}
                onClick={(e) => this.handleClick(e)}
            >

                <List.Icon color='blue' name='cubes' size='large' verticalAlign='middle'/>
                <List.Content>
                    <List.Header>{projecttitle}</List.Header>
                    <List.Description>{projectdescription}</List.Description>
                </List.Content>
            </ListItemWrapper>
        )
    }
}

export default ProjectItem




