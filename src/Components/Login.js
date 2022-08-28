import React, { useState, useEffect } from "react";
import { auth } from "../Db/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useLocation } from "react-router-dom";
import "./Registration.css";

export default function Login(props) {
  const location = useLocation();
  const data = location.state;
  console.log(data, "data");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        props.updateUser(userCredential.user);

        console.log("Signed in! Welcome!", userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const signout = (e) => {
  //   e.preventDefault();
  //   signOut(auth).then(() => {
  //     console.log("You have signed out!");
  //     navigate("/");
  //   })
  //   .catch((err)=>{
  //    console.log(err.message)
  // });
  // };

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
        <input type="submit" value="Login" className="submitBtn" />
      </form>
    </div>
  );
}
