import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import { useHistory } from 'react-router-dom';


const AppNavBar = () =>{
    const history = useHistory();
    return <Navbar color="dark" dark expand="md">
             <NavbarBrand onClick={()=> history.push('/home')}>Home</NavbarBrand>
        </Navbar>
}
export default AppNavBar;