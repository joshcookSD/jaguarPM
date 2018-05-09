import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavSideWrapper = styled.div`
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 10;
  background-color: black;
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
  background-color: #232929;
  color: #958993;
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
            <NavItems><Link to='/view-users'>u</Link></NavItems>
            <NavItems><Link to='/view'>t</Link></NavItems>
            <NavItems><Link to='/view-group'>g</Link></NavItems>
            <NavItems><Link to='/project-admin'>p</Link></NavItems>
            <NavItems><Link to='/team-admin'>ta</Link></NavItems>
            <NavItems><Link to='/org-admin'>oa</Link></NavItems>
        </NavList>
    </NavSideWrapper>
);

export default NavSidebar;