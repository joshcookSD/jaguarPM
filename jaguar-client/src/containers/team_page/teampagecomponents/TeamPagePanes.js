import React, {Component} from 'react';
import TeamProjectProgress from './TeamProjectProgress';


class TaskView extends Component {

    render () {
        if(this.props.activeView === 'feed') {
            return (
                <div>
                    View
                    {console.log('ran feed')}
                </div>
            );
        }
        if(this.props.activeView === 'progress') {
            return (
                <div>
                    <TeamProjectProgress team={this.props.team}/>
                    {console.log('ran progress')}
                </div>
            );
        }
        if(this.props.activeView === 'project') {
            return (
                <div>
                    project
                    {console.log('ran project')}
                </div>
            );
        }
    }
}

export default TaskView;
