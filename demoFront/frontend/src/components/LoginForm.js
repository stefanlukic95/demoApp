import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()


  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };

    const response = await axios.post(
      
      "http://localhost:8080/generate-token",
      
      user
    );

    setUser(response.data)
    localStorage.setItem('user', response.data)
    console.log(response.data)
  };


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };



  if (user) {
    return <div>{user.name} is loggged in</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="enter a username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          placeholder="enter a password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <button onClick={handleLogout}>Logout</button>
    </form>
  );
};

export default LoginForm;