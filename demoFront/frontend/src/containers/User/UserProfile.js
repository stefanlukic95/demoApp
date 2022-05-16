import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../services/authentication/auth-service";   

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      redirect: null,
      currentUser: {username: ""},
      currentToken: {token: ""}
    };
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser();
    this.setState({ currentToken: currentUser, currentUser: currentUser.user})
  }

  logOut() {
    authService.logout();
    this.setState({
      currentUser: undefined,
      redirect: "/home"

    });
    window.location.reload()
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
      </div>
      </div>
    );
  }
}