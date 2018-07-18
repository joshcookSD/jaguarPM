import React, {Component} from 'react';
// import TeamProjectProgress from './TeamProjectProgress';


class TaskView extends Component {

    render () {
        if(this.props.activePageTab === 'feed') {
            return (
                <div>
                    View
                </div>
            );
        }
        if(this.props.activePageTab === 'progress') {
            return (
                <div>
                    {/*<TeamProjectProgress team={this.props.team}/>*/}
                </div>
            );
        }
        if(this.props.activePageTab === 'project') {
            return (
                <div>
                    project
                </div>
            );
        }
    }
}

export default TaskView;
