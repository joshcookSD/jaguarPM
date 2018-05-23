import React, {Component} from 'react';
import { Query } from "react-apollo";
import {Header, Dimmer, Loader, Modal, Icon, List, Transition, Divider} from 'semantic-ui-react';
import decode from 'jwt-decode';
import { userProjectGroups} from "../../apollo-graphql/groupProjectQueries";
import GroupTaskItem from './GroupTaskItem'


const token = localStorage.getItem('token');

class GroupList extends Component {
    state = {
        open: false,
    };

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {

        const { user } = decode(token);
        const variables = {_id: user._id};
        const { open } = this.state;
        return(
            <Query query={userProjectGroups} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                        { (data.user.projects || []).map( project => (
                            <div key={project._id}>
                                <Header >{project.projecttitle} - {project.team.teamtitle}<Icon onClick={this.show} color='green' name='add circle' floated='right'/></Header>

                                <Modal size='small' open={open} onClose={this.close}>
                                    <Modal.Header>
                                        Create Task
                                    </Modal.Header>
                                    <Modal.Content>
                                        {/*<GroupTaskForm project={project._id} userId={user._id} updateQuery={userProjectGroups} variables={variables} onClose={this.close}/>*/}
                                    </Modal.Content>
                                </Modal>
                                <Transition.Group
                                    as={List}
                                    duration={200}
                                    divided
                                    relaxed
                                    size='large'
                                >
                                    { project.groups.map(group => {
                                        return (
                                            <GroupTaskItem
                                                key={group._id}
                                                groupId={group._id}
                                                grouptitle={group.grouptitle}
                                                groupdescription={group.groupdescription}
                                            />
                                        )})
                                    }
                                </Transition.Group>
                                <Divider />
                            </div>))}

                    </div>;
                }
                }
            </Query>
        )
    }
}



export default GroupList;

