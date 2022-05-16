import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { ButtonGroup, Container, Table } from 'reactstrap';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter, Router } from 'react-router-dom'
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './containers/Login';
import Profile from './containers/User/UserProfile';
import UserList from './containers/User/UserList';
import UserEdit from './containers/User/UserEdit';
import authService from './services/authentication/auth-service';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import eventBus from './common/EventBus';
import BoardUser from './components/UserBoard';
import BoardAdmin from './components/AdminBoard';


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.onChangeCurrentUser =this.onChangeCurrentUser.bind(this);
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
        showAdminBoard: user.user.roles.includes("ADMIN"),
      });
    }
    
    eventBus.on("logout", () => {
      this.logOut();
    });
  }

 
  componentWillUnmount() {
    eventBus.remove("logout");
  }

  onChangeCurrentUser(user){
    if(user){
    this.setState({
      currentUser: user,
      showAdminBoard: user.user.roles.includes("ADMIN"),
    }); 
  }
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
  <nav className="navbar navbar-expand navbar-dark bg-dark">

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home 
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"admin"} className="nav-link">
                  Admin Board
                </Link>
              <li>
              <Link to="/userId/new">
                Register
               </Link>
               </li>

          </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"user"} className="nav-link">
                  User
                </Link>
                <li>
                <Link to="/profile">
                User profile
               </Link>
               </li>
              
              </li>
              
            )}
          </div>
          
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>
            <Switch>
              <Route path='/allUsers' component={UserList}/>
              <Route path='/userId/:id' component={UserEdit}/>
              <Route path='/userId/new' component={UserEdit}/>
              <Route path='/login' > 
              <Login changeUser={this.onChangeCurrentUser}/>
              </Route>
              <Route path='/profile' component={Profile}></Route>
              <Route path='/home'component={Home}></Route>
              <Route path='/usercontent' component={BoardUser}></Route>
              <Route path='/admincontent' component={BoardAdmin}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
            </div>
      )
    }
  }
  export default App;
