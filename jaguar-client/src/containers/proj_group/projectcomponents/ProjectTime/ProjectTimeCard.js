import React, {Component} from 'react';
import { Card,  Header, Dimmer, Loader, } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const timeByProject = gql`
 query timeByProject($project: String!){
      timeByProject(project: $project) {
           _id
            time
        }
 }
 `;

class ProjectTimeCard extends Component {
    render () {
        return (
            <Query query={timeByProject} variables={this.props.variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader/>
                            </Dimmer>
                        </div>
                    );
                    if (error) return <p>No Project Selected</p>;
                    console.log(data)
                    const workedHours = data.timeByProject.map(time => time.time).reduce((x, y) => x + y, 0);
                    return (
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header>total project time worked</Card.Header>
                                <Card.Description>
                                    <Header as='h2'>{workedHours}</Header>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                }}
            </Query>
        )
    }
}

export default ProjectTimeCard;