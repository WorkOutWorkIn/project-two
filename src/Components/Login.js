import React, { useState, useEffect } from "react";
import { auth } from "../Db/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const location = useLocation();
  const data = location.state;
  console.log(data, "data");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate("/usercards");

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
    <div className="App-header">
      <h2>Login</h2>
      {/* Conditional output? */}
      <form onSubmit={(e) => handleLogin(e, email, password)}>
        <br />
        <label>Email:</label> <br />
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="enter email"
        />
        <br />
        <label>Password:</label> <br />
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="enter password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
