import React, { useState, useEffect } from "react";
import { auth } from "../Db/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import "./Registration.css";
import { useAuth } from "./AuthContext";

export default function Login(props) {
  const location = useLocation();
  const data = location.state;
  console.log(data, "data");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email.length === 0 || password === 0) {
      setError(true);
    }

    try {
      await login(email, password);
    } catch {
      console.log("Failed to login");
    }
    navigate("/usercards");
  }

  return (
    <div className="signupFrm">
      <form onSubmit={(e) => handleLogin(e, email, password)} className="form">
        <h2 className="title">Login</h2>
        <div className="inputContainer">
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input"
          />
          <label className="label">Email:</label>
          {error && email.length <= 0 ? (
            <label className="labelerror">wrong email! try again.</label>
          ) : (
            ""
          )}
        </div>

        <div className="inputContainer">
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input"
          />
          <label className="label">Password:</label>

          {error && password.length <= 0 ? (
            <label className="labelerror">wrong password! try again.</label>
          ) : (
            ""
          )}
        </div>
        <input type="submit" value="Login" className="submitBtn" />
      </form>
    </div>
  );
}
