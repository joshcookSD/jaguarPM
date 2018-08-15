
import React, {Component} from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import GroupAddTimeForm from './GroupAddTimeForm'

class GroupTimeModal extends Component {

    render () {
        return(
            <div>
                <Modal
                    floated='right'
                    trigger={
                        <div>
                            <Icon
                                name='plus circle'
                                floated='right'
                                size='big'
                                color='green'
                            />
                        </div>
                    }
                >
                    <Modal.Header>Add Time To Group</Modal.Header>
                    <Modal.Content >
                        {/*<GroupAddTimeForm*/}
                            {/*userName={this.props.userName}*/}
                            {/*taskcurrentowner={this.props.userId}*/}
                            {/*group={data.group._id}*/}
                            {/*project={data.group.project._id}*/}
                            {/*team={data.group.project.team._id}*/}
                            {/*teamUsers={data.group.project.team.users.map(user =>  ({ text: user.username, _id: user._id}))}*/}
                        {/*/>*/}
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default GroupTimeModal;