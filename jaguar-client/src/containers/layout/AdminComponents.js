import styled from 'styled-components';

//add user
const UserWrapper = styled.div`
    margin-top: 5px;
    color: black
    border-width: 1px;
    border radius: 0 0 !important
    width: 90%;
    height: 42px;
    display:grid
    grid-template-columns: 25% 60% 15%;
`;

const OrgPageTeamCardWrapper = styled.div`
    margin-top: 5px;
    color: black
    border-width: 1px;
    border radius: 0 0 !important
    width: 90%;
    height: 42px;
    display:grid
    grid-template-columns: 25% 60% 15%;
`;

const ImageWrapper = styled.img`
    height: 40px
    width: 40px
    border-radius: .28571429rem;
`;

const CardRight = styled.div`
    height: 100%;
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;


    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 10px;
    
    grid-row-start: 3;
    grid-row-end: ;
        
`;

const NewUserCardName = styled.span`
    align-self: center;
`;

const DeleteUserIcon = styled.span`
    justify-self: center;
    align-self: center;
`;

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
  grid-row: 1;
  background-color: black;
  color: white;
  padding-top: .4em;
  padding-right: 1em;
`;

const CardLeftWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 2;
    grid-row-end: 2;
`;

const AdminPagePaneWrapper = styled.div`
    padding: 10px;
    height: 94vh;
    width: 50%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr 4fr;
    grid-column-gap: 10px;

`;
const AdminPageHeaderWrapper = styled.div`
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 1;
    grid-column-end: 3;
`;

export {
    UserWrapper,
    ImageWrapper,
    CardRight,
    NewUserCardName,
    DeleteUserIcon,
    HeaderWrapper,
    CardLeftWrapper,
    OrgPageTeamCardWrapper,
    AdminPagePaneWrapper,
    AdminPageHeaderWrapper

};