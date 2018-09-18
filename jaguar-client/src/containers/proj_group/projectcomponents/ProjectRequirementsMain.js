import React, {Component} from 'react';
import { Header, Icon, Input } from 'semantic-ui-react';
import {createGroupFromReq, projectDetails} from "../../apollo-graphql/groupProjectQueries";
import { Mutation } from "react-apollo";
import ProjectRequirementModal from './ProjectRequirementModal'
import ProjectRequirementPlannedTimeForm from "./ProjectRequirementPlannedTimeForm";
import decode from "jwt-decode";


class ProjectRequirementsMain extends Component {
    state = {
        hoveringIcon: false,
        hoveringIconIndex: '',
        hoveringIcon2: false,
        hoveringIconIndex2: '',
        plannedTiime:'',
        timeOpen: false,
        timeOpenIndex: '',
        showWhatever: ''
    };

    onEnterIcon = (i) => this.setState({ hoveringIcon: true, hoveringIconIndex: i });
    onExitIcon = () => this.setState({ hoveringIcon: false, hoveringIconIndex: '' });

    onEnterIcon2 = (i) => this.setState({ hoveringIcon2: true, hoveringIconIndex2: i });
    onExitIcon2 = () => this.setState({ hoveringIcon2: false, hoveringIconIndex2: '' });

    timeClose = () => this.setState({ timeOpen: false });

    render () {
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const{ data } = this.props;
        const{ timeOpen, timeOpenIndex } = this.state;
        const project = data.project._id;
        const team = data.project.team._id;
        const duedate = data.project.requirements.duedate;

        return(
            <Mutation mutation={createGroupFromReq}>
                {(createGroupFromReq, { loading }) => {
                    return (
                        <div>
                            <ProjectRequirementModal data={data}/>
                            {(data.project.requirements || []).map((req, i) =>(
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        backgroundColor: this.state.hoveringIcon && this.state.hoveringIconIndex === i  ? '#efadad' : 'white',
                                        // background: this.state.hoveringIcon2 && this.state.hoveringIconIndex2 === i  ? 'rgb(230,255,241)' : 'white',
                                    }}>
                                        <div style={{'font-size' : '1vw'}}>{req.requirementtitle}</div>
                                        <div style={{'display' : 'flex'}}>
                                            <div>
                                                {timeOpen && (timeOpenIndex === i) &&
                                                <ProjectRequirementPlannedTimeForm
                                                    project={project}
                                                    reqId={req._id}
                                                    timeClose={this.timeClose}
                                                 />
                                                }
                                            </div>
                                            {
                                                !req.isApproved &&
                                                <Icon
                                                    name={'clock'}
                                                    color={req.requirementplannedtime.length > 0 ? 'green' : 'black'}
                                                    size="large"
                                                    onClick={() => this.setState({timeOpen: !timeOpen, timeOpenIndex: i})}
                                                />
                                            }
                                            {
                                                !req.isApproved &&
                                                <Icon
                                                    name="chevron circle up"
                                                    size="large"
                                                    onMouseEnter={() => this.onEnterIcon2(i)}
                                                    onMouseLeave={this.onExitIcon2}
                                                    color={this.state.hoveringIcon2 && this.state.hoveringIconIndex2 === i ? 'green' : 'black'}
                                                    loading={loading}
                                                    onClick={async e => {
                                                        e.preventDefault();
                                                        if(!req.isApproved) {
                                                            await createGroupFromReq({
                                                                variables: {
                                                                    grouptitle: req.requirementtitle,
                                                                    groupdescription: req.requirementdescription,
                                                                    project,
                                                                    user: user._id,
                                                                    requirement: req._id,
                                                                    duedate,
                                                                    plannedTimeIds: req.requirementplannedtime.map(rpt => rpt._id).toString(),
                                                                    team
                                                                },
                                                                refetchQueries: [
                                                                    {query: projectDetails, variables: {_id: project}}
                                                                ]
                                                            });
                                                        }else{
                                                            alert('group for requirement already exsits')
                                                        }
                                                    }}
                                                />
                                            }

                                            <Icon
                                                name={req.isApproved  ? 'check circle' : 'square outline'}
                                                color={req.isApproved  ? 'green' : 'black'}
                                                size='large'
                                            />
                                            <Icon
                                                name='delete'
                                                size='large'
                                                onMouseEnter={() => this.onEnterIcon(i)}
                                                onMouseLeave={this.onExitIcon}
                                                color={this.state.hoveringIcon && this.state.hoveringIconIndex === i ? 'red' : 'black'}
                                                onClick={async e => {
                                                    e.preventDefault();
                                                    // await deleteGroupReq({
                                                    console.log(req);
                                                    {console.log( {
                                                            TaskIds: req.group.tasks.map((task) => task._id).toString(),
                                                            // groupTasksIds: ,
                                                            taskCommentIds: req.group.tasks.map((task) => task.comments.map(comment => comment._id)).toString(),
                                                            groupCommentIds:req.group.comments.map((comment) => comment._id).toString(),
                                                            taskTimeIds:req.group.tasks.map((task) => task.tasktime.map(time => time._id)).toString(),
                                                            groupTimeIds:req.group.times.map((time) => time._id).toString(),
                                                            taskPlannedTimeIds:req.group.tasks.map((task) => task.plannedtime.map(time => time._id)).toString(),
                                                            groupPlannedTimeIds: req.group.plannedtime.map((pt) => pt._id).toString(),
                                                            reqPlannedTimeIds:req.requirementplannedtime.map(rpt => rpt._id).toString(),
                                                            groupId: req.group.id,
                                                            // defualtGroupId:,
                                                            // newDefualtGroupId:,
                                                            // groupProjectId:,
                                                            // groupTeamId:,
                                                            // reqId:,
                                                            // reqProjectId:,
                                                        // })}
                                                        // refetchQueries: [
                                                        //     {query: projectDetails, variables: {_id: project}}
                                                        // ]
                                                      } ) }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{'padding-left' :'10px'}}>{req.requirementdescription}</div>
                                    <br/>
                                </div>
                            ))}
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default ProjectRequirementsMain;