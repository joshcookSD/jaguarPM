import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavSideWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 5;
  background-color: #362234;
  color: #958993;
`;
const NavList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const NavItems = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const NavSidebar = () => (
    <NavSideWrapper>
        <NavList>
            <NavItems><Link to='/view'>t</Link></NavItems>
            <NavItems><Link to='/view-users'>u</Link></NavItems>
            <NavItems><Link to='/orgAdmin'>oa</Link></NavItems>
        </NavList>
    </NavSideWrapper>
);

export default NavSidebar;