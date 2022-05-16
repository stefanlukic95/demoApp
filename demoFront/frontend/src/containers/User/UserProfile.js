import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AppNavBar from "../../components/AppNavbar";
import authService from "../../services/authentication/auth-service";   

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      redirect: null,
      userReady:false,
      currentUser: {username: ""},
      currentToken: {token: ""}
    };
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser();
    console.log(currentUser)

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentToken: currentUser, currentUser: currentUser.user, userReady: true })
    
  }

  logOut() {
    authService.logout();
    this.setState({
      currentUser: undefined,
      redirect: "/home"

    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentToken, currentUser } = this.state;
    
    return (
      <div >

        <div>
        <header className="jumbotron">
          <h3>
            <strong>User:</strong>{" "}
            {currentUser.name}
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentToken.token}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <button   className="btn btn-primary btn-block" onClick={this.logOut}>Logout </button>
      </div>
      </div>
    );
  }
}