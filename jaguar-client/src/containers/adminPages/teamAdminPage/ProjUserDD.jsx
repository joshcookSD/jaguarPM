import React from 'react';
import { Card, List } from 'semantic-ui-react';
import DropdownSelection from './teamInvite';

const ProjUserDD = (props) => (
        <Card className="cardRight">
                <DropdownSelection teamId={props.teamId} teamsByOwner={props.teamsByOwner} variables={props.variables} />
            <List>
                {props.team.users.map((user, i) => (
                        <List.Item  key={i}>
                            <List.Content>
                                <List.Header as='a'><List.Icon name='user' />{user.username}</List.Header>
                            </List.Content>
                        </List.Item>
                ))}
            </List>
        </Card>
);

// import {
//     removeOrgUser
// } from '../../apollo-graphql/teamOrgQueries.js'

// import {
//     UserWrapper,
//     ImageWrapper,
//     CardRight,
//     NewUserCardName,
//     DeleteUserIcon
// } from "../../layouts/AdminComponents.js";





// // class OrgAddUserCard extends Component {

// //     deleteUser(userId) {
// //         console.log(userId)
// //         console.log(this.props.orgId)
// //         removeOrgUser({
// //             variables: {
// //                 _id: this.props.orgId,
// //                 user: userId
// //             }
// //         });
// //     }

// //     render() {

// //         const {
// //             org,
// //             orgId,
// //             getOrgByOwner,
// //             variables
// //         } = this.props;

// //         return (<
// //             Mutation mutation={
// //                 removeOrgUser
// //             } > {
// //                 (removeOrgUser, {
// //                     data
// //                 }) => (<
// //                     CardRight >
// //                     <
// //                         DropdownSelection orgId={
// //                             this.props.orgId
// //                         }
// //                         getOrgByOwner={
// //                             this.props.getOrgByOwner
// //                         }
// //                         variables={
// //                             this.props.variables
// //                         }
// //                     /> {
// //                         this.props.org.users.map((user, i) => (<
// //                             UserWrapper image key={
// //                                 i
// //                             } > {
// //                                 console.log(user)
// //                             } <
// //                                 ImageWrapper src='http://i.pravatar.cc/300' />
// //                             <
// //                             NewUserCardName > {
// //                                     user.username
// //                                 } < /NewUserCardName> <
// //                             DeleteUserIcon >
// //                                     <
// //                                         Icon size='large'
// //                                         name='delete'
// //                                         onClick={
// //                                             async e => {
// //                                                 e.preventDefault();
// //                                                 await removeOrgUser({
// //                                                     variables: {
// //                                                         _id: orgId,
// //                                                         user: user._id
// //                                                     },
// //                                                     refetchQueries: [{
// //                                                         query: getOrgByOwner,
// //                                                         variables: variables
// //                                                     }]
// //                                                 });
// //                                             }
// //                                         }
// //                                     /> <
// //                             /DeleteUserIcon> <
// //                             /UserWrapper>
// //                                 ))
// //                     } <
// //                     /CardRight>
// //                                 )
// //             } <
// //             /Mutation>
// //                                 )
// //                             }
// //                         }


                        export default ProjUserDD;
