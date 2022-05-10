import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { ButtonGroup, Container, Table } from 'reactstrap';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import { BrowserRouter, Router } from 'react-router-dom'
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';
import LoginForm from './components/LoginForm';



class App extends Component {
    render() {
      return (
          <BrowserRouter>
            <Switch>
              <Route path='/' exact={true} component={Home}/>
              <Route path='/allUsers' exact={true} component={UserList}/>
              <Route path='/userId/:id' component={UserEdit}/>
              <Route path='/login' exact={true} component={LoginForm}/>
            </Switch>
          </BrowserRouter>
      )
    }
  }
  export default App;
