import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const TaskList = () => (
    {gql`
 {
  allTasks {
    _id
    tasktitle
    taskcurrentowner {
      _id
      username
    }
  }
}
 `}>
        { ({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return <div>
                {data.allTasks.map(({_id, tasktitle, taskcurrentowner}) => (
                    <li key={_id}>{tasktitle}
                       <span>{taskcurrentowner ? taskcurrentowner.username : null}</span>
                    </li>
                    ))
                }
            </div>;
        }
        }
    </Query>
);


export default TaskList;