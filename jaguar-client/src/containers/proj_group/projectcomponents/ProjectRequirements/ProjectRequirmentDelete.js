import React, {Component} from 'react';
import { Icon,Loading } from 'semantic-ui-react';

class RequirementList extends Component {
    state = {
        hoveringIcon: false,
        hoveringIconIndex: '',
    };

    onEnterIcon = (i) => this.setState({ hoveringIcon: true, hoveringIconIndex: i });
    onExitIcon = () => this.setState({ hoveringIcon: false, hoveringIconIndex: '' });

    render () {
        const{ req, i } = this.props;
        return (
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
        )
    }
}

export default RequirementList;