import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader } from 'semantic-ui-react';

    class UnassignedGroupList extends Component {
        // for project selection
        componentWillUpdate(nextProps, nextState) {
            if(nextProps.selectedProject !== this.props.selectedProject) {
                this.setState({projectId: nextProps.selectedProject});
            }
        }

        state = {
            projectId: ''
        };

        render() {

            const {
                selectedProject,
                projectDetails,
                queryVariables  } = this.props;

            if(this.state.projectId) {
            return(
                <Query query={projectDetails} variables={ queryVariables }>
                    { ({ loading, error, data }) => {
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader />
                                </Dimmer>
                            </div>);
                        if (error) return <p>Error :( {selectedProject}</p>;
                        return (
                            <div>
                                {data.project.groups.map((group, i) => (
                                    <li key={i}>{group.grouptitle}</li>
                                ))}
                            </div>
                        )
                    }}
                </Query>
            )} else { return (<div/>)}
        }
    }

export default UnassignedGroupList;

