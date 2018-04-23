import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const UserList = () => (
    <Query query={gql`
    {
     allUsers {
       _id
       username
       tasks {
            _id
            tasktitle
       }
     }
   }
 `}>
        { ({ loading, error, data }) => {
            console.log(data);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return <ul>
                {data.allUsers.map(({_id, username, tasks}) => (
                    <li key={_id}>
                        {username}
                        <ul>
                            {tasks.map(({tasktitle, _id}) => (
                                <li key={_id}>{tasktitle}</li>
                            ))}
                        </ul>
                    </li>))
                }
            </ul>;
        }
        }
    </Query>
);


export default UserList;