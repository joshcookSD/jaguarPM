import React from 'react';
import {Link} from 'react-router-dom';
import { Image, Popup, Button, Menu } from 'semantic-ui-react';
import Logo from '../../images/jaguarwhite.png';
import client from "../../apollo";


const style = {
    borderRadius: 3,
    opacity: 0.95,
    padding: '0.5em',
};

const HeaderMenu = () => (
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
);

export default HeaderMenu;