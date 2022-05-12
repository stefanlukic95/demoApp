import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../services/authentication/auth-service";   

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      redirect: null,
      userReady:false,
      currentUser: {username: ""}
    };
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser();
    //console.log(currentUser)

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
   
  }
  
  logOut() {
    authService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div >
        <div>
        <header className="jumbotron">
          <h3>
            <strong>User:</strong> {" "}
            {currentUser.username}
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token}{" "}
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