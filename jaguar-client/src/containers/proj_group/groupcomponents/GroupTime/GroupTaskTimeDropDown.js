import React, {Component} from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const groupDetails = gql`
query group($_id: String!) {
  group(_id: $_id) {
    _id
    tasks {
      _id
      tasktitle
      __typename
    }
    __typename
  }
}`;

class GroupTaskTimeDropDown extends Component {
    state = {
        selectedTask: '' ,
        selectedTaskTitle: ''
    };

    render() {
        console.log(this.props.selectedGroup)
        return (
            <Query query={groupDetails} variables={{_id: this.props.selectedGroup}}>
                {({loading, error, data}) => {
                    if (error) return <p>No Project Selected</p>;
                    console.log(data)
                    let groupTasks= data.group.tasks.map(task =>  ({ text: task.tasktitle, _id: task._id}));
                    return (
                        <div >
                            <Form style={{'paddingLeft' : '1em'}}>
                                <Dropdown text={this.state.selectedTaskTitle ? this.state.selectedTaskTitle : 'choose task'} scrolling floating labeled button className='icon' >
                                    <Dropdown.Menu>
                                        <Dropdown.Header content='Assign to' />
                                        {groupTasks.map((option, i) =>
                                            <Dropdown.Item
                                                key={i}
                                                value={option._id}
                                                selection
                                                {...option}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({selectedTask: option._id});
                                                    this.setState({selectedTaskTitle: option.text});
                                                    this.props.onTaskPick( option._id, option.text);
                                                }}
                                            />
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default GroupTaskTimeDropDown;

