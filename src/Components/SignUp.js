import React, { useState, useEffect, useContext } from "react";
import { auth, database } from "../Db/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, Timestamp, collection, addDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import "./Registration.css";
import { useLocation, Link } from "react-router-dom";

export default function Signup(props) {
  const location = useLocation();
  const data = location.state;
  console.log(data, "data");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [button, setButton] = useState(false);

  const { signup } = useAuth();

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      await signup(name, email, password);
    } catch {
      console.log("Failed to create account");
    }
  }

  return (
    <div className="signupFrm">
      {/* Conditional output? */}

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
        </div>
        <input disabled type="submit" value="Sign up" className="submitBtn" />
      </form>
    </div>
  );
}
