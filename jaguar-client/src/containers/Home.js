import React, {Component} from 'react';
import { Header, Container } from 'semantic-ui-react';
import Navbar from "./Navbar";
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div id='bg' >
                <Navbar/>
                <Container text style={{ marginTop: '4em', paddingTop: '2em' }}>
                    <Header as='h2'>Welcome to Jaguar</Header>
                </Container>
            </div>
        )
    }
}

export default Home;