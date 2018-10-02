import React, {Component} from 'react';
import { Icon, Loading, Dimmer, Loader  } from 'semantic-ui-react';
import ProjectRequirementPlannedTimeForm from "./ProjectRequirementPlannedTimeForm";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import RequirementToGroup from "./RequirementToGroup";
import ProjectRequirmentDelete from "./ProjectRequirmentDelete";

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

class RequirementList extends Component {
    state = {
        hoveringIcon: false,
        hoveringIconIndex: '',
        timeOpen: false,
        timeOpenIndex: '',
    };
    onEnterIcon = (i) => this.setState({ hoveringIcon: true, hoveringIconIndex: i });
    onExitIcon = () => this.setState({ hoveringIcon: false, hoveringIconIndex: '' });
    timeClose = () => this.setState({ timeOpen: false });
    render () {
        const{ selectedProject } = this.props;
        const{ timeOpen, timeOpenIndex } = this.state;

        return (
            <Query query={projectRequirements} variables={{_id: selectedProject}}>
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
                        (data.project.requirements || []).map((req, i) =>(
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div style={{'font-size' : '1vw'}}>{req.requirementtitle}</div>
                                    <div style={{'display' : 'flex'}}>
                                        {timeOpen && (timeOpenIndex === i) &&
                                        <ProjectRequirementPlannedTimeForm
                                            project={data.project._id}
                                            reqId={req._id}
                                            timeClose={this.timeClose}
                                        />}
                                        {!req.isApproved &&
                                        <Icon
                                            name={'clock'}
                                            size="large"
                                            onMouseEnter={() => this.onEnterIcon(i)}
                                            onMouseLeave={this.onExitIcon}
                                            color={this.state.hoveringIcon && this.state.hoveringIconIndex === i ? 'green' : 'black'}
                                            onClick={() => this.setState({timeOpen: !timeOpen, timeOpenIndex: i})}
                                        />}
                                        {!req.isApproved &&
                                        <RequirementToGroup selectedProject={selectedProject} req={req} data={data} i={i}/>}
                                        <Icon name={req.isApproved  ? 'check circle' : 'square outline'} color={req.isApproved  ? 'green' : 'black'} size='large'/>
                                        <ProjectRequirmentDelete  req={req} i={i}/>
                                    </div>
                                </div>
                                <div style={{'padding-left' :'10px'}}>{req.requirementdescription}</div>
                                <br/>
                            </div>
                        ))
                    )
                }}
            </Query>
        )
    }
}

export default RequirementList;

