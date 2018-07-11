import React, {Component} from 'react';
import { Query } from "react-apollo";
import decode from 'jwt-decode';
import { teamsByUser } from "../../apollo-graphql/userQueries";
import "./TeamPageMain.css";
import styled from 'styled-components';
import  TeamPageNavTabs from './TeamPageNavTabs'
import TeamPageDetails from './TeamPageDetails';
import TeamPageTabs from './TeamPageTabs.js';
import TeamPagePanes from './TeamPagePanes.js';
import TeamTaskPrioriety from './TeamTaskPrioriety.js';
import { Dimmer, Loader } from 'semantic-ui-react'


const TeamPagePaneGrid = styled.div`
   width: 100%;
   height: 94vh;
    display: grid;
    grid-template-columns: 1fr 90px 1fr;
    grid-template-rows: repeat(4, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
`;


const Activity = styled.div`
background-color: lightblue;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-column-end: 3;
    grid-row-end: 5;
`;
const Details = styled.div`
    background-color: pink;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 1;
    grid-row-end: 3;
`;
const Prioriety = styled.div`
background-color: lightgreen;
    grid-column-start: 1;
    grid-row-start: 3;
    grid-column-end: 1;
    grid-row-end: 5;
`;
const Secondary = styled.div`
background-color: #f17dbf;
    grid-column-start: 2;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 5;
    * {box-sizing: border-box}
body {font-family: "Lato", sans-serif;}

/* Style the tab */
.tab {
    float: left;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 30%;
    height: 300px;
}

/* Style the buttons inside the tab */
.tab button {
    display: block;
    background-color: inherit;
    color: black;
    padding: 22px 16px;
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current "tab button" class */
.tab button.active {
    background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 70%;
    border-left: none;
    height: 300px;
}
`;

const token = localStorage.getItem('token');
const { user } = decode(token);
const userId = user._id;
const variables = { user: userId };

class TeamPageMain extends Component {
    state = {
        activeView: '',
        activePageTab: 'feed',
        isSelectedPageTab: false,
        isSelected: false,
    };
    changeView = (view) => {
        this.setState({activePageTab: view, isSelectedPageTab: true });
    };

    handleClick = (team) => {
        this.setState({activeView: team, isSelected: true });
    };

    render() {
        const { activeView, activePageTab, isSelected,isSelectedPageTab } = this.state;

        return (
        <Query query={teamsByUser} variables={variables}>
            {({ loading, error, data }) => {
                if(this.state.isSelected === false ) {
                    (data.teamsByUser || []).forEach((team, i) => {
                        if (i === 0) {
                            this.setState({activeView: team, isSelected: true})
                        }
                    });
                }
                return (
                    <div className='container'>
                        <TeamPageNavTabs
                            changeView={this.handleClick}
                            activeView={activeView}
                            activePageTab={activePageTab}
                            isSelected={isSelected}
                            data={data}
                            user={user}
                        />
                        <TeamPagePaneGrid>
                            <Secondary>
                                <TeamPageTabs changeView={this.changeView} activePageTab={activePageTab} isSelectedPageTab={isSelectedPageTab}/>
                            </Secondary>

                            <Activity>
                                <TeamPagePanes activePageTab={activePageTab} team={activeView}/>
                            </Activity>

                            {isSelected ?
                                ([
                                    <Details>
                                        <TeamPageDetails activeView={activeView} isSelectedPageTab={isSelectedPageTab}/>
                                    </Details>,

                                    <Prioriety>
                                        <TeamTaskPrioriety activeView={activeView}/>
                                    </Prioriety>
                                ]) : (
                                    <Dimmer active>
                                        <Loader />
                                    </Dimmer>
                                )
                            }
                        </TeamPagePaneGrid>
                    </div>
                )
            }}
        </Query>
        )
    }
}

export default TeamPageMain;

