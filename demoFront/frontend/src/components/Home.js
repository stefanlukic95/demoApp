import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component { 
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/allUsers" >Users</Link></Button>
                    <Button color="link"><Link to="/login">Login</Link></Button>
                    <Button color="link"><Link to="/profile">User profile</Link></Button>
                </Container>
            </div>
        );
    }
}
export default Home;