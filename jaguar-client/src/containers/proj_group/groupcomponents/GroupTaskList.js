import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader, Card } from 'semantic-ui-react';
import GroupTaskForm from "./GroupTaskForm"

class GroupTaskList extends Component {
    // for project selection
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.selectedGroup !== this.props.selectedGroup) {
            this.setState({groupId: nextProps.selectedGroup});
        }
    }

    state = {
        groupId: ''
    };

    render() {

        const {
            selectedGroup,
            groupDetails,
            queryVariables
        } = this.props;

        if(this.state.groupId) {
            return(
                <Query query={groupDetails} variables={ queryVariables }>
                    { ({ loading, error, data }) => {
                        console.log(data)
                        if (loading) return (
                            <div>
                                <Dimmer active>
                                    <Loader />
                                </Dimmer>
                            </div>);
                        if (error) return <p>Error :( {selectedGroup}</p>;
                        return (
                            <div>
                                <GroupTaskForm
                                    group={data.group._id}
                                    team={data.group.team._id}
                                    project={data.group.project._id}
                                    query={groupDetails}
                                    variables={ queryVariables }
                                />
                                {data.group.tasks.map((task, i) => (
                                    <Card key={i}>
                                    <Card.Content>
                                    <Card.Header>{task.tasktitle}</Card.Header>
                                    <Card.Description>{task.taskdescription}</Card.Description>
                                    {/* <Card.Meta>Description</Card.Meta> */}
                                    </Card.Content>
                                    </Card>
                                ))}
                            </div>
                        )
                    }}
                </Query>
            )} else { return (<div/>)}
    }
}

export default GroupTaskList;
