import React, { useState} from "react";
import { Link} from "react-router-dom";
import { useAuth } from "./useAuth";
import "./index.css"


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
 


  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "admin" && password === "12345678") {
      await login({ username });
    } else {
      alert("Invalid username or password");
    }
  };

 
  return (
    <>
      <div className="mainContent">
        <div className="title"> Admin logIn</div>
        <div className="register">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        </div>
      </div>
      
      
    </>
  );
}
export default Login;
