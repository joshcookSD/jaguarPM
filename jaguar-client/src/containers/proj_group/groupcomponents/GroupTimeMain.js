import React, {Component} from 'react';
import GroupTimeModal from './GroupTimeModal'
import GroupTimeCards from './GroupTimeCards'


class GroupTimeMain extends Component {

    render () {
        return(
            <div>
                <GroupTimeModal data={this.props.data}/>
                <GroupTimeCards data={this.props.data}/>
            </div>
        )
    }
}

export default GroupTimeMain;