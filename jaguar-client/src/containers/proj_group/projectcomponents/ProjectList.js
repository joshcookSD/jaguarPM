import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Header, Dimmer, Loader} from 'semantic-ui-react';
import moment from 'moment';
import decode from 'jwt-decode';
import { userTeamProjects} from "../../apollo-graphql/groupProjectQueries";
import ProjectItem from './ProjectItem'

const token = localStorage.getItem('token');

class ProjectList extends Component {

    render() {

        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const variables = {_id: user._id};
        return(
            <Query query={userTeamProjects} variables={variables}>
                { ({ loading, error, data }) => {
                    console.log(data);
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                            { (data.user.team || []).map( team => (
                                <div key={team._id}><Header >{team.teamtitle}</Header>
                                    { team.projects.map(project => (
                                         <ProjectItem
                                            key={project._id}
                                            projectId={project._id}
                                            projecttitle={project.projecttitle}
                                            />
                                        ))}
                                </div>))}

                    </div>;
                }
                }
            </Query>
        )
    }
}



export default ProjectList;

