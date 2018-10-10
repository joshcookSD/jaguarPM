import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Dimmer, Loader, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const removeGroupFromProject = gql`
mutation removeGroupFromProject($groupInput: groupDeleteInput!){
  removeGroupFromProject(groupInput: $groupInput) {
		projecttitle
  }
}
`;

const groupDetails = gql`
query group($_id: String!) {
  group(_id: $_id) {
    _id
    grouptitle
    groupdescription
    plannedcompletiondate
    duedate
    comments{
      _id
    }
    groupplannedtime{
        _id
        time
    }
    grouptime{
       _id
      time
    }
    team {
        _id
        teamtitle
        defaultproject{
            _id
            defaultgroup{
                _id
            }
        }
        __typename
    }
    project {
        team{
            _id
            users{
                _id
                username
            }
        }
        defaultgroup{
        _id
        }
        projecttitle
        _id
        groups{
        _id
        }
        __typename
    }
    users {
        _id
        username
        __typename
    }
    tasks {
        _id
        iscompleted
        tasktitle
        taskdescription
        comments{
            _id
        }
        taskplannedtime{
            time
        }
        tasktime{
            time
            user{
                username
                time{
                    time
                }
            }
        }
        group{
            _id
        }
        __typename
    }
    __typename
  }
}`;

class GroupDetail extends Component {
    render() {
        const {
            selectedGroup,
            queryVariables,
            userId,
        } = this.props;


        return (
            <Query query={groupDetails} variables={{_id: selectedGroup}}>
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
                        <Mutation mutation={removeGroupFromProject}>
                            {(removeGroupFromProject, {loading}) => {
                                if (loading) return (
                                    <div>
                                        <Dimmer active>
                                            <Loader/>
                                        </Dimmer>
                                    </div>
                                );
                                return (
                                    <Button size='small' basic color='red' onClick={async e => {
                                        e.preventDefault();
                                        const newDefualtGroupArray = data.group.project.groups.filter(group => group._id !== data.group.project.defaultgroup._id);
                                        if (newDefualtGroupArray.length === 0) {
                                            alert('cant must have one group in each project')
                                        } else {
                                            await removeGroupFromProject({
                                                variables: {
                                                    groupInput: {
                                                        _id: data.group._id,
                                                        project: data.group.project._id,
                                                        team: data.group.team._id,
                                                        tasks: data.group.tasks.map((task) =>`${task._id}`),
                                                        users: data.group.users.map((user) => `${user._id}`),
                                                        comments: data.group.comments.map(comment => `${comment._id}`),
                                                        grouptime: data.group.grouptime.map(gt => `${gt._id}`),
                                                        groupplannedtime: data.group.groupplannedtime.map(gpt => `${gpt._id}`),

                                                        newDefaultGroupForProj: newDefualtGroupArray[0]._id,
                                                        projectsDefualtGroup: data.group.project.defaultgroup._id,
                                                        userId: userId,
                                                    }
                                                }
                                                    // groupToRemoveId: data.group._id,
                                                    // groupUsersIds: data.group.users.map((user) => user._id).toString(),
                                                    // groupsTeamId: data.group.team._id,
                                                    // groupsProjectId: data.group.project._id,
                                                    // GroupsTasks: data.group.tasks.map((task) => task._id).toString(),


                                                    // taskComments: data.group.tasks.map((task) => task.comments).length < 1 ? null : data.group.tasks.map(task => task.comments.map(comment => comment._id)).toString(),
                                                    // // taskTimes: data.group.tasks.map((task) => task.tasktime).length < 1 ? null : data.group.tasks.map(task => task.tasktime.map(time => time._id)).toString(),

                                            });
                                        }
                                        // this.props.removeGroupSwitchForDefault()
                                    }}>remove</Button>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export default GroupDetail