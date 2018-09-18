import styled from 'styled-components';

const ProjGroupContentArea = styled.div`
        display: grid;
        grid-template-columns: (2, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px
`;

const TeamPagePaneGrid = styled.div`
    width: 100%;
    height: 94vh;
    display: grid;
    grid-template-columns: 3fr 90px 5fr;
    grid-template-rows: repeat(6,1fr);
    grid-row-gap: 10px;
     @media (max-width: 1000px) {
        grid-template-columns: 1fr;
        grid-template-rows: 3fr 3fr 1fr 5fr;
  }
`;
const Activity = styled.div`
background-color: lightblue;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-column-end: 3;
    grid-row-end: 7;
    margin-bottom: 20px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
      overflow: auto;
    box-shadow: 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
    background: #fff;
    /* padding: 0; */
    border: none;
    border-radius: .28571429rem;
    padding: 10px;
        @media (max-width: 1000px) {
        overflow: auto;
        grid-column-start: 1;
        grid-row-start: 4;
  }
`;
const Details = styled.div`
    // background-color: pink;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 1;
    grid-row-end: 3;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
    @media (max-width: 1000px) {
        grid-column-start: 1;
        grid-row-start: 1;
        grid-row-end: 2;
  }
`;
const Prioriety = styled.div`
background-color: lightgreen;
    grid-column-start: 1;
    grid-row-start: 3;
    grid-column-end: 1;
    grid-row-end: 7;
    margin-bottom: 20px;
    margin-right: 10px;
    margin-left: 10px;
    box-shadow: 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
    background: #fff;
    /* padding: 0; */
    border: none;
    border-radius: .28571429rem;
    padding: 10px;
     overflow: auto;
        @media (max-width: 1000px) {
        grid-column-start: 1;
        grid-row-start: 2;
        grid-row-end: 2;
  }
`;
const Secondary = styled.div`
// background-color: #f17dbf;
    grid-column-start: 2;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 7;
  
     @media (max-width: 1000px) {
        grid-column-start: 1;
        grid-row-start: 3;
        grid-row-end: 3;
  }
    padding-top: 10px;
    padding-bottom: 20px;
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

const GroupFormWrapper = styled.form`
    box-shadow: 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
    background: #fff;
    border: none;
    border-radius: .28571429rem;
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto; 
}
`;


const NavItems = styled.div`
  max-width: 100px; 
  min-width: 70px;
  height: 100%;
  line-height: 40px;
  // margin: 0 15px 0 15px;
  // text-align: center;
  // color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: .28571429rem;
  
  &:hover {
    background-color: #e6fff1
    border-radius: .28571429rem;
    
  }
  justify-content: space-around;

`;

const NavItemContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
         @media (max-width: 1000px) {
        flex-direction: row;
  }
    
`;


const TeamPageProjectListWrapper = styled.div`
    box-shadow: 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
    background: #fff;
    border: none;
    border-radius: .28571429rem;
    padding: 10px;
    height: 100%;
    overflow: auto;

}
`;




export {
    ProjGroupContentArea,
    TeamPagePaneGrid,
    Activity,
    Details,
    Prioriety,
    Secondary,
    GroupFormWrapper,
    NavItems,
    NavItemContainer,
    TeamPageProjectListWrapper,



};