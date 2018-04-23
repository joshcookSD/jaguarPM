import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import Logo from '../../images/jaguarwhite.png';

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
  grid-row: 1;
  background-color: black;
  color: white;
  padding-top: .4em;
  padding-right: 1em;
`;

export default () => (
    <HeaderWrapper>
        <Image verticalAlign='middle' floated='right'
            size='mini'
            src={Logo}
        />
    </HeaderWrapper>
);