import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import {Dropdown} from 'semantic-ui-react';

const projectOptions = gql`
query team($_id: String){
  team(_id: $_id) {
    _id
    projects{
       _id
       projecttitle
       defaultgroup {
        _id
        grouptitle
        }
    }
  }
}
`;

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
        const { team, timeProject} = this.props;

        const _selectProject = (project) => {
            this.setState({selectedProject: project});
            this.props.selectProject(project);
        };

        return(
            <Query query={projectOptions} variables={{_id: team._id}}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>loading...</div>);
                    if (error) return <p>Error :(</p>;
                    return (
                        <Dropdown text={timeProject.projecttitle}  fluid scrolling floating labeled button className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Header content='Project' />
                                {(data.team.projects || []).map((option, i) =>
                                    <Dropdown.Item
                                        key={i}
                                        value={option._id}
                                        text={option.projecttitle}
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
            </Query>
        )
    }
}

export default ProjectTimeDropdown;