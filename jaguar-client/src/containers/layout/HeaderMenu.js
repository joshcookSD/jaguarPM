
import React from 'react';
import {Link} from 'react-router-dom';
import { Image, Popup, Button, Menu } from 'semantic-ui-react';
import Logo from '../../images/jaguarwhite.png';
import client from "../../apollo";
import styled from 'styled-components';

const JaguarPosition = styled.div`
`;

const style = {
    borderRadius: 3,
    opacity: 0.95,
    padding: '0.5em',
};

const HeaderMenu = (props) => (
        <Popup
            trigger={
                <JaguarPosition>
                    <Image
                           size='mini'
                           src={Logo}
                    />
                </JaguarPosition>

            }
            content={
                <Menu vertical inverted size='tiny'>
                    <Menu.Item>{props.user.email}</Menu.Item>
                    <Link to='/update-user'>
                        <Menu.Item>account</Menu.Item>
                    </Link>
                    <Link to='/org-admin'>
                        <Menu.Item>organization admin</Menu.Item>
                    </Link>
                    <Link to='/team-admin'>
                        <Menu.Item>team admin</Menu.Item>
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
);

export default HeaderMenu;