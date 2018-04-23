import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/jaguarwhite.png';
import { Menu, Image, Dropdown} from 'semantic-ui-react';
import client from '../apollo';
import './Navbar.css';

const Navbar = () => {
    const authToken = localStorage.getItem('token');
    return (
        <Menu fixed='top' inverted>
            <Menu.Item header>
                <Link to='/'>
                <Image
                    size='mini'
                    src={Logo}
                />
                </Link>
            </Menu.Item>
            <Menu.Menu position='right'>
            <Dropdown item simple text={authToken ? 'User' : 'Account'}>
                <Dropdown.Menu id='navbarDropdown'>
                    {!authToken ? (
                        <div>
                        <Dropdown.Item><Link to='/login'>login</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='/signup'>sign up</Link></Dropdown.Item>
                        </div>
                        ):(
                        <div>
                        <Dropdown.Item><Link to='/view'>tasks</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='/view-users'>view users</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='/update-user'>update user</Link></Dropdown.Item>

                        <Dropdown.Item><Link to='/' onClick={() => {
                            localStorage.removeItem('token');
                            client.cache.reset();
                            this.props.history.push(`/`)
                        }}>log out</Link></Dropdown.Item>
                        </div>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            </Menu.Menu>
        </Menu>
    );
};

export default Navbar;