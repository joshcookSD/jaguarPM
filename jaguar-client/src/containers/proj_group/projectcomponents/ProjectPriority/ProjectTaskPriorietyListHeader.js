
import React, {Component} from 'react';
import styled from 'styled-components';

const ProjectTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 10px;
`;

class ProjectTaskPriorietyMain extends Component {
    render() {
        const { data } = this.props;
        return (
            <ProjectTitleWrapper>
                <div>Project : {data.project.projecttitle}</div>
                <div>Groups Completed
                    : {data.project.groups.filter(group => group.iscompleted === true).length} / {data.project.groups.length}
                </div>
            </ProjectTitleWrapper>
        )
    }
}

export default ProjectTaskPriorietyMain