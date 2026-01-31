import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("user", JSON.stringify(res.data));
    login(res.data);
  } catch {
    alert("Invalid email or password");
  }
};


  return (
    <div className="netflix-login">
      <div className="login-left">
        <h1>Welcome to Netflix</h1>
        <p>
          Unlimited movies, TV shows, and exclusive originals.  
          Watch anywhere. Cancel anytime.
        </p>
      </div>

      <div className="login-right">
        <h2>User Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          New to Netflix?{" "}
          <span onClick={() => (window.location.href = "/register")}>
            Create account
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
