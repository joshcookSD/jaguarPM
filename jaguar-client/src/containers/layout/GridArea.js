import styled from 'styled-components';

const GridArea = styled.div`
  padding: 1em;
  grid-row-start: 2;
  grid-row-end: 4; 
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch
    display: flex;
    flex-direction: column;
    `;

export default GridArea;