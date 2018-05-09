import styled from 'styled-components';

const ContentArea = styled.div`
  grid-column: 3;
  grid-row-start: 2;
  grid-row-end: 4;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch`;

export default ContentArea;