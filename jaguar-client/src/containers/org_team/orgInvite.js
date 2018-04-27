import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Dropdown } from 'semantic-ui-react'
import { allUsers } from "../apollo-graphql/userQueries";

let friendOptions=  [];

const DropdownExampleSelection = () => (
    
    <Query query={allUsers} >
            {({ loading, error, data }) => {  
            {
                data.allUsers ? data.allUsers.map(user => (
                    friendOptions.push({text : user.username, _id : user._id})
                )) : 'No Data'
            }           
            return (
                <div className="dropDownDiv">
                <h3>Add User</h3>
                    <Dropdown text='Add user' icon='add user' floating labeled button className='icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='People You Might Know' />
                            {friendOptions.map(option => 
                                <Dropdown.Item 
                                    key={option.value} 
                                    value={option._id}
                                    {...option} 
                                    onClick={async e => {
                                        e.preventDefault();
                                        // await createTask({
                                            // variables: { tasktitle: newTask, taskcurrentowner, iscompleted: false, plandate, team },
                                            // refetchQueries: [{ query: updateQuery, variables: variables }]
                                        // });
                                        // this.setState({ newTask: "" });
                                        // console.log(value)
                                        
                                    }}
                                    />)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            );
        }}
    </Query >
);

// class DropdownExampleSelection extends Component {
//     render() {
//         return (
//             ({ loading, error, data }) => {
//             {
//                 data.allUsers ? data.allUsers.map(user => (
//                     friendOptions.push({ text: user.username, _id: user._id })
//                 )) : 'No Data'
//             }
//                 <Query query={allUsers} >
//                     <div className="dropDownDiv">
//                         <h3>Add User</h3>
//                         <Dropdown text='Add user' icon='add user' floating labeled button className='icon'>
//                             <Dropdown.Menu>
//                                 <Dropdown.Header content='People You Might Know' />
//                                 {friendOptions.map(option =>
//                                     <Dropdown.Item
//                                         key={option.value}
//                                         value={option._id}
//                                         {...option}
//                                         onClick={async e => {
//                                             e.preventDefault();
//                                             // await createTask({
//                                             // variables: { tasktitle: newTask, taskcurrentowner, iscompleted: false, plandate, team },
//                                             // refetchQueries: [{ query: updateQuery, variables: variables }]
//                                             // });
//                                             // this.setState({ newTask: "" });
//                                             console.log(value)

//                                         }}
//                                     />)}
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </div>
//                 </Query>
//             );
//         }
//     }
// }


export default DropdownExampleSelection