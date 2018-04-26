import React from 'react';
// import { graphql } from "react-apollo";
import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import styled from 'styled-components';
// import { Dropdown } from 'semantic-ui-react'
import { allUsers } from "../apollo-graphql/userQueries";


const DropdownExampleSelection = (onuserSelected) => (
    <Query query={allUsers} >
            {({ loading, error, data }) => {
            return (
                <select name="user" onChange={onuserSelected}>
                    {data.allUsers ? data.allUsers.map(user => (
                        <option key={user._id} value={user.breed}>
                            {user.username}
                        </option>
                    )) : 'No Data'}
                </select>
            );
        }}
    </Query >
);


export default DropdownExampleSelection