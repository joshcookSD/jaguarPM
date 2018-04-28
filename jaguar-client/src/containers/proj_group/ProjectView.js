import React, {Component} from 'react';
import { Query } from "react-apollo";
import moment from 'moment';
import decode from 'jwt-decode';
import {Dimmer, Loader} from 'semantic-ui-react';
import AppLayout from '../layout/AppLayout'
import NavSidebar from '../layout/NavSidebar'
import MainSidebar from '../layout/MainSidebar'
import Header from '../layout/Header'
import ContentArea from '../layout/ContentArea'
import ProjectList from './projectcomponents/ProjectList'
import ProjectDetails from './projectcomponents/ProjectDetails'
import {Section, TopSection} from '../layout/Section'
import {userTeams} from "../apollo-graphql/userQueries";

const token = localStorage.getItem('token');

class ProjectView extends Component {
    state = {
        projectId: "",
    };
    selectProject = (project) => this.setState({ projectId: project });

    render() {
        const { user } = decode(token);
        const {projectId} = this.state;
        return(
            <Query query={userTeams} variables={{_id: user._id}}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                        <AppLayout>
                            <NavSidebar/>
                            <MainSidebar><ProjectList selectProject={this.selectProject}/></MainSidebar>
                            <Header/>
                            <ContentArea>
                                <TopSection>
                                    <ProjectDetails projectId={projectId}/>
                                </TopSection>
                            </ContentArea>
                        </AppLayout>
                    </div>;
                }
                }
            </Query>
        )
    }
}



export default ProjectView;

