import React, { useState, useEffect, useContext } from "react";
import { auth, database } from "../Db/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, Timestamp, collection, addDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import "./Registration.css";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Signup(props) {
  const location = useLocation();
  const data = location.state;
  console.log(data, "data");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const { signup } = useAuth();
  let navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      setError(true);
    }

    try {
      await signup(name, email, password);
    } catch {
      console.log("Failed to create account");
    }
    navigate("/profile");
  }

  return (
    <div className="signupFrm">
      <form onSubmit={(e) => handleSignUp(e, email, password)} className="form">
        <h2 className="title">Signup</h2>
        <div className="inputContainer">
          <input
            name="name"
            type="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="input"
          />
          <label className="label">Name:</label>
          {error && name.length <= 0 ? (
            <label className="labelerror">name required!</label>
          ) : (
            ""
          )}
        </div>
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
            <label className="labelerror">email required!</label>
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
            <label className="labelerror">password required!</label>
          ) : (
            ""
          )}
        </div>
        <input type="submit" value="Sign up" className="submitBtn" />
      </form>
    </div>
  );
}
