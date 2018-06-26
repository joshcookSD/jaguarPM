import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Image, Tab } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { teamsByUser } from "../../apollo-graphql/userQueries";
import Logo from '../../../images/jaguarwhite.png';
import { HeaderWrapper } from '../../layout/AdminComponents.js'
import "./TeamPageMain.css";
import styled from 'styled-components';
import TeamPageDetails from './TeamPageDetails';
import TeamPageTabs from './TeamPageTabs.js';
import TeamPagePanes from './TeamPagePanes.js';
import TeamTaskPrioriety from './TeamTaskPrioriety.js';

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
        activeView: 'feed',
        isSelected: false,
    };
    changeView = (view) => {
        this.setState({activeView: view, isSelected: true });
    };
    render() {
        const { activeView, isSelected } = this.state;
        return (
        <Query query={teamsByUser} variables={variables}>
            {({ loading, error, data }) => {

                const dataPane = (data.teamsByUser || []).map(team => (
                    {
                        menuItem: team.teamtitle, render: () =>
                            <Tab.Pane className="orgTab" attached={false}>

                                {/*<Details>*/}
                                    {/*<TeamPageDetails team={team} />*/}
                                {/*</Details>*/}

                                {/*<Prioriety>*/}
                                    {/*<TeamTaskPrioriety team={team}/>*/}
                                {/*</Prioriety>*/}

                                <Activity>
                                    <TeamPagePanes activeView={activeView} team={team}/>
                                </Activity>

                                <Secondary>
                                    <TeamPageTabs changeView={this.changeView} activeView={activeView} isSelected={isSelected}/>
                                </Secondary>

                            </Tab.Pane>
                    }
                ));
                if (loading) return null;
                if (error) return `Error!: ${error}`;
                return (
                    <HeaderWrapper>
                        <Image verticalAlign='middle' floated='right'
                               size='mini'
                               src={Logo}
                        />
                        <Tab menu={{ secondary: true }} panes={dataPane} />
                    </HeaderWrapper>
                )
            }}
        </Query>
        )
    }

}



export default TeamPageMain;

