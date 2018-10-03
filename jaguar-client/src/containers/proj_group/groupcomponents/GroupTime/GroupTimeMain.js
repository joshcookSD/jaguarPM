import React, {Component} from 'react';
import GroupTimeModal from './GroupTimeModal'
import GroupTimeCards from './GroupTimeCards'


class GroupTimeMain extends Component {

    render () {
        return(
            <div>
                <GroupTimeModal
                    data={this.props.data}
                    selectedGroup={this.props.selectedGroup}

                />
                <GroupTimeCards
                    data={this.props.data}
                    selectedGroup={this.props.selectedGroup}
                />
            </div>
        )
    }
}

export default GroupTimeMain;