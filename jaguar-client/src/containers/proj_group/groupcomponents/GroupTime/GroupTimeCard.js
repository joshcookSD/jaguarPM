import React, {Component} from 'react';
import { Card,  Header, Dimmer, Loader, } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const timeByGroup = gql`
    query timeByGroup($group: String!){
        timeByGroup(group: $group) {
            _id
            time
        }
    }
`;

class GroupTimeCard extends Component {
    render () {
        return (
            <Query query={timeByGroup} variables={this.props.variables}>
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
                    const groupHours = data.timeByGroup.map(time => time.time).reduce((x, y) => x + y, 0);
                    return (
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header>total time worked</Card.Header>
                                <Card.Description>
                                    <Header as='h2'>{groupHours}</Header>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                }}
            </Query>
        )
    }
}

export default GroupTimeCard;