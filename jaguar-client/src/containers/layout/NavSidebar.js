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
  color: rgb(230, 255, 241);
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: 2px;
    border-color: rgb(230, 255, 241);
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
                    trigger={<NavItems><Icon fitted size='big' name='tasks'/></NavItems>}
                    content="tasks"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/view-group'>
                <Popup
                    trigger={<NavItems><Icon fitted size='big' name='cube' /></NavItems>}
                    content="groups"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/project-admin'>
                <Popup
                    trigger={<NavItems><Icon fitted size='big' name='cubes' /></NavItems>}
                    content="projects"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/team-admin'>
                <Popup
                    trigger={<NavItems><Icon fitted size='big' name='users' /></NavItems>}
                    content="teams"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/team-page'>
                <Popup
                    trigger={<NavItems><Icon fitted size='big' name='users' /></NavItems>}
                    content="teams"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/org-admin'>
                <Popup
                    trigger={<NavItems><Icon fitted size='big' name='sitemap' /></NavItems>}
                    content="organizations"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
            <Link to='/template-test'>
                <Popup
                    trigger={<NavItems><Icon fitted size='big' name='sitemap' /></NavItems>}
                    content="template-test"
                    position='right center'
                    style={style}
                    inverted
                />
            </Link>
        </NavList>
    </NavSideWrapper>
);

export default NavSidebar;