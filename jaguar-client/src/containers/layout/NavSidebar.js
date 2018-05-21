import React from 'react';
import styled from 'styled-components';
import { Icon, Popup } from 'semantic-ui-react'
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

const style = {
    borderRadius: 3,
    opacity: 0.95,
    padding: '0.5em',
};

const NavSidebar = () => (
    <NavSideWrapper>
        <NavList>
            <Link to='/view'>
                <Popup
                    trigger={<NavItems><Icon fitted name='tasks'/></NavItems>}
                    content="tasks"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/view-group'>
                <Popup
                    trigger={<NavItems><Icon fitted name='cube' /></NavItems>}
                    content="groups"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/project-admin'>
                <Popup
                    trigger={<NavItems><Icon fitted name='cubes' /></NavItems>}
                    content="projects"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/team-admin'>
                <Popup
                    trigger={<NavItems><Icon fitted name='users' /></NavItems>}
                    content="teams"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/org-admin'>
                <Popup
                    trigger={<NavItems><Icon fitted name='sitemap' /></NavItems>}
                    content="task view"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
        </NavList>
    </NavSideWrapper>
);

export default NavSidebar;