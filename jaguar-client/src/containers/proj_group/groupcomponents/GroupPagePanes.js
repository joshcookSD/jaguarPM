import React, {Component} from 'react';

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
                    progress
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
