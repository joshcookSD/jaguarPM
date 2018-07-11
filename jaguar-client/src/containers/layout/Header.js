import React from 'react';
import styled from 'styled-components';
import HeaderMenu from './HeaderMenu'

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
  grid-row: 1;
  background-color: black;
  color: white;
  padding-top: .4em;
  padding-right: 1em;
`;

export default (props) => (
    <HeaderWrapper>
        <HeaderMenu user={props.user}/>
    </HeaderWrapper>
);