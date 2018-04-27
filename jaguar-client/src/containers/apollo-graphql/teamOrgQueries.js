import gql from "graphql-tag";

const teamsByUser = gql`
 query user($_id: String){
  user(_id: $_id) {
    _id
    username
    team {
      _id
      teamtitle
      
    }
  }
}
 `;

export {teamsByUser};