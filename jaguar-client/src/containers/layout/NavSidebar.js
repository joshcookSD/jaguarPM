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
  color: #4183c4;
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
            <Link to='/view'><NavItems>t</NavItems></Link>
            <Link to='/view-group'><NavItems>g</NavItems></Link>
            <Link to='/project-admin'><NavItems>p</NavItems></Link>
            <Link to='/team-admin'><NavItems>ta</NavItems></Link>
            <Link to='/org-admin'><NavItems>oa</NavItems></Link>
        </NavList>
    </NavSideWrapper>
);

export default NavSidebar;