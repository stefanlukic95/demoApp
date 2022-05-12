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
import eventBus from './common/EventBus';
import { HashRouter } from 'react-router-dom';
import Login from './containers/Login';
import Profile from './containers/User/UserProfile';
import UserList from './containers/User/UserList';
import UserEdit from './containers/User/UserEdit';
import authService from './services/authentication/auth-service';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,

      });
      //bude null a posle ovog undefined, zasto je undefined? user.username a u user je samo token
      console.log(user.username,"token")
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


        <div> 
          <HashRouter>
            <Switch>
              <Route path='/' exact={true} component={Home}/>
              <Route path='/allUsers' exact={true} component={UserList}/>
              <Route path='/userId/:id' component={UserEdit}/>
              <Route path='/allUsers/new' component={UserEdit}/>
              <Route path='/login' exact={true} component={Login}/>
              <Route path='/profile' exact={true} component={Profile}></Route>
              <Route path='/home' exact={true} component={Home}></Route>
             
            </Switch>
          </HashRouter>
          </div>

          </div>
      )
    }
  }
  export default App;
