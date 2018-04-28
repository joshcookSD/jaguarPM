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
import {Section, TopSection} from '../layout/Section'
import {userTeams} from "../apollo-graphql/userQueries";

const token = localStorage.getItem('token');

class ProjectView extends Component {

    render() {
        const { user } = decode(token);
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
                            <MainSidebar><ProjectList/></MainSidebar>
                            <Header/>
                            <ContentArea>
                                <TopSection>

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

