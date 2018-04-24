import gql from 'graphql-tag';

const addUser = gql`
mutation signup($username: String!, $password: String!, $email: String!) {
  signup(username: $username, password: $password, email: $email) {
    ok
    user {
        _id
        email
        username
        profileImageUrl
        }
    errors {
      path
      message
    }
  }
}
`;

const getCurrentUser = gql`
    query {
        CurrentUser {
            _id
            email
            username
            profileImageUrl
        }
    }
`;

const loginUser = gql`
    mutation login( $password: String!, $email: String!) {
        login(email: $email, password: $password) {
        ok
        token
        refreshToken
        user {
            _id
            email
            username
            profileImageUrl
            }
        errors {
            path
            message
            }
        }
    }`;

const getOrgByOwner = gql`
    query orgByOwner($owner: String ){
    orgByOwner(owner: $owner ){
        orgtitle
        orgdescription
        owner{
        username
        }
    }
    }
`

export { addUser, getCurrentUser, loginUser, getOrgByOwner};