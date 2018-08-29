import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader, Card } from 'semantic-ui-react';
import AddGroupForm from "./AddGroupForm";
import { Link } from 'react-router-dom';

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
                queryVariables,
                userId,
                selectTeam
            } = this.props;

            if(this.state.projectId) {
            return(
                <Query query={projectDetails} variables={ queryVariables }>
                    { ({ loading, error, data }) => {
                        console.log(selectTeam)
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader />
                                </Dimmer>
                            </div>);
                        if (error) return <p>Error :(</p>;
                        return (
                            <div>
                                <AddGroupForm
                                    selectedProject={selectedProject}
                                    selectTeam={selectTeam}
                                    projectDetails={projectDetails}
                                    queryVariables={queryVariables}
                                    userId={ userId }
                                />
                                {data.project.groups.map((group, i) => (
                                    <Link to='/view-group' key={i}>
                                        <Card>
                                            <Card.Content>
                                                <Card.Header>{group.grouptitle}</Card.Header>
                                                <Card.Description>{group.groupdescription}</Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )
                    }}
                </Query>
            )} else { return (<div/>)}
        }
    }

export default UnassignedGroupList;

