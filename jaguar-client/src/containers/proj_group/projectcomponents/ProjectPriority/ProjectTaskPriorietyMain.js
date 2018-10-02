
import React, {Component} from 'react';
import { Dimmer, Loader} from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ProjectTaskPriorietyList from './ProjectTaskPriorietyList.js';
import ProjectTaskPriorietyListHeader from './ProjectTaskPriorietyListHeader.js';

export const projectDetails = gql`
query project($_id: String!) {
    project(_id: $_id) {
        _id
        projecttitle
        groups{
            _id
            grouptitle
            groupdescription
            iscompleted
            tasks {
                _id
                iscompleted
                tasktitle
                taskdescription
                group{
                    _id
                }
                __typename
            }
            
        }
    }
}`;

class ProjectTaskPriorietyMain extends Component {

    state = {
        groupIdForTasksDrop: '',
        dropdownopen: false
    };

    render() {
        const { selectedProject } = this.props;
        return (
            <Query query={projectDetails} variables={{_id: selectedProject}}>
                {({loading, error, data}) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    if (error) return <p>No Project Selected</p>;
                    return (
                        <div>
                            <ProjectTaskPriorietyListHeader data={data}/>
                            <ProjectTaskPriorietyList data={data} selectedProject={selectedProject}/>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default ProjectTaskPriorietyMain