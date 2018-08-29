import styled from 'styled-components';

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  background-color: black;
  display: flex;
  height: 6vh;
`;

const IconWrapper = styled.div`
  width: 5%
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderGrid = styled.div`

  display: flex;
  height: 100%
  width: 95%
  padding-left: 1em;
  overflow: auto;
`;

const NavItems = styled.div`
  max-width: 70px; 
  min-width: 70px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  margin-right: 20px;
  &:hover {
    border-style: solid;
    border-width: 0 0 5px 0;
    border-color: #767676;
  }
`;

export {
    HeaderWrapper,
    IconWrapper,
    HeaderGrid,
    NavItems
}
