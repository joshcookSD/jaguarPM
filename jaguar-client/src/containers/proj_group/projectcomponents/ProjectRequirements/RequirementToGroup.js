import React, {Component} from 'react';
import { Icon, Loading  } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import decode from "jwt-decode";
import gql from "graphql-tag";
const token = localStorage.getItem('token');
const { user } = decode(token);

const projectRequirements = gql`
query project($_id: String!) {
    project(_id: $_id){
        _id
        team{
            _id
        }
        requirements{
            _id
            isApproved
            requirementtitle
            requirementdescription
            duedate
            requirementplannedtime{
                _id
                time
                }
            group{
                _id
                groupplannedtime{
                    _id
                }
                grouptime{
                    _id
                }
                comments{
                    _id
                }
                tasks{
                    _id
                    taskplannedtime{
                        _id
                    }
                    tasktime{
                        _id
                    }
                    comments{
                        _id
                    }
                }
            }
        }
    }
}`;

const createGroupFromReq = gql`
    mutation createGroupFromReq(
       $grouptitle: String,
       $groupdescription: String,
       $project: String,
       $requirement: String,
       $user: String,
       $duedate: Date,
       $plannedTimeIds: String
       $team: String
    ){ createGroupFromReq(
       grouptitle: $grouptitle 
       groupdescription: $groupdescription 
       project: $project 
       requirement: $requirement
       user: $user 
       duedate: $duedate 
       plannedTimeIds: $plannedTimeIds
       team: $team
       ){
            ok
            errors {
                path
                message
            }
        }
    }
`;


class RequirementToGroup extends Component {
    state = {
        hoveringIcon2: false,
        hoveringIconIndex2: '',
    };

    onEnterIcon2 = (i) => this.setState({ hoveringIcon2: true, hoveringIconIndex2: i });
    onExitIcon2 = () => this.setState({ hoveringIcon2: false, hoveringIconIndex2: '' });

    render () {
        const{ req, data, i, selectedProject } = this.props;
        return (
            <Mutation mutation={createGroupFromReq}>
                {(createGroupFromReq, { loading }) => {
                    return (
                        <Icon
                            name="chevron circle up"
                            size="large"
                            onMouseEnter={() => this.onEnterIcon2(i)}
                            onMouseLeave={this.onExitIcon2}
                            color={this.state.hoveringIcon2 && this.state.hoveringIconIndex2 === i ? 'green' : 'black'}
                            loading={loading}
                            onClick={async e => {
                                e.preventDefault();
                                console.log(selectedProject)
                                if (!req.isApproved) {
                                    await createGroupFromReq({
                                        variables: {
                                            grouptitle: req.requirementtitle,
                                            groupdescription: req.requirementdescription,
                                            project: data.project._id,
                                            user: user._id,
                                            requirement: req._id,
                                            duedate: data.project.requirements.duedate,
                                            plannedTimeIds: req.requirementplannedtime.map(rpt => rpt._id).toString(),
                                            team: data.project.team._id
                                        },
                                        update: async (store) => {
                                        const data = store.readQuery({query: projectRequirements, variables: {_id: selectedProject}  });
                                        let currentReq = data.project.requirements.find(requirement => requirement._id === req._id);
                                        currentReq.isApproved = !currentReq.isApproved;
                                        await store.writeQuery({
                                            query: projectRequirements,
                                            variables: {_id: selectedProject},
                                            data: data
                                        });
                                    }
                                    });
                                } else {
                                    alert('group for requirement already exsits')
                                }
                            }}
                        />
                    )
                }}
            </Mutation>
        )
    }
}
export default RequirementToGroup;
