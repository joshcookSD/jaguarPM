import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { Image, Popup, Button, Menu } from 'semantic-ui-react';
import Logo from '../../images/jaguarwhite.png';
import client from "../../apollo";

const HeaderWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
  grid-row: 1;
  background-color: black;
  color: white;
  padding-top: .4em;
  padding-right: 1em;
`;

const style = {
    borderRadius: 3,
    opacity: 0.95,
    padding: '0.5em',
};

export default () => (
    <HeaderWrapper>
        <Popup
            trigger={
                <Image verticalAlign='middle' floated='right'
                       size='mini'
                       src={Logo}
                />
            }
            content={
                <Menu vertical inverted size='tiny'>
                    <Link to='/update-user'>
                        <Menu.Item>account</Menu.Item>
                    </Link>
                        <Menu.Item>
                            <Link to='/' onClick={() => {
                                localStorage.removeItem('token');
                                client.cache.reset();
                                this.props.history.push(`/`)
                                }}>
                                <Button fluid color='red' content='logout' />
                            </Link>
                        </Menu.Item>
                </Menu>}
            on='click'
            style={style}
            inverted
        />
    </HeaderWrapper>
);