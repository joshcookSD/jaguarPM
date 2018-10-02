import React, {Component} from 'react';
import GroupTimeMain from './GroupTime/GroupTimeMain'


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
        if(this.props.activePageTab === 'time') {
            return (
                <div>
                    <GroupTimeMain
                        data={this.props.data}
                        selectedGroup={this.props.selectedGroup}
                    />
                </div>
            );
        }
    }
}

export default TaskView;
