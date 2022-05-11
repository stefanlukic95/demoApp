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

import UserEdit from './containers/UserEdit';
import Login from './components/Login';
import UserList from './components/UserList';
import authService from './services/auth-service';
import eventBus from './common/EventBus';
import Profile from './components/UserProfile';



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ADMIN"),
      });
    }
    
    eventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    eventBus.remove("logout");
  }

  logOut() {
    authService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

    render() {

      const { currentUser, showAdminBoard } = this.state;
      return (
        <div> 
          {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
          <BrowserRouter>
            <Switch>
              <Route path='/' exact={true} component={Home}/>
              <Route path='/allUsers' exact={true} component={UserList}/>
              <Route path='/userId/:id' component={UserEdit}/>
              <Route path='/allUsers/new' component={UserEdit}/>
              <Route path='/login' exact={true} component={Login}/>
              <Route path='/profile' exact={true} component={Profile}></Route>
             
            </Switch>
          </BrowserRouter>
          </div>
      )
    }
  }
  export default App;
