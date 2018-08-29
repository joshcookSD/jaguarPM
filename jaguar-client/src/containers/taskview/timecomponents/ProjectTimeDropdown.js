import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';

class ProjectTimeDropdown extends Component {
    state = {
        update: false
    };
    componentWillReceiveProps(nextProps){
        if(this.props.timeProject._id !== nextProps.timeProject._id){
            this.setState({
                update: !this.state.update
            });
        }
    }

    render() {
        const { projectOptions, timeProject} = this.props;

        const _selectProject = (project) => {
            this.setState({selectedProject: project});
            this.props.selectProject(project);
            this.props.createGroupOptions(project);
        };

        return(
            <Dropdown text={timeProject.projecttitle}  fluid scrolling floating labeled button className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Header content='Project' />
                    {(projectOptions || []).map((option, i) =>
                        <Dropdown.Item
                            key={i}
                            value={option._id}
                            {...option}
                            onClick={() => {
                                _selectProject(option);
                            }}
                        />)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default ProjectTimeDropdown;