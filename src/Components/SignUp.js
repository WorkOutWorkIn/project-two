import React, { useState, useEffect, useContext } from "react";
import { auth, database } from "../Db/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, Timestamp, collection, addDoc } from "firebase/firestore";
import { UserContext } from "../App";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //move to higher component
  // const [user, setUser] = useState("");
  const context = useContext(UserContext);
  const navigate = useNavigate();
  // const colRef = collection(database, "user");

  const handleSignUp = async (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        console.log("Signed Up", cred.user.uid);
        // props.updateUser(cred);
        // navigate("/");
        return cred;
      })
      .then(async (cred) => {
        console.log("sent to db");
        console.log(cred);
        try {
          console.log(cred.user.uid, email, name);
          console.log(database);
          console.log("try", "catch");

          await updateProfile(auth.currentUser, { displayName: name });
          await setDoc(
            doc(
              database,
              `userstest2`,
              `${cred.user.uid}`,
              "profile",
              `${cred.user.uid}_profile`
            ),
            {
              uid: cred.user.uid,
              email: email,
              name: name,
              gender: "",
              age: "",
              smoker: "",
              height: "",
              religion: "",
              location: "",
              funfact: "",
              bio: "",
              promptfield: "",
              image: [],
            }
          );
        } catch (error) {
          console.log(error);
        }
        setEmail("");
        setPassword("");
        setName("");
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      {/* Conditional output? */}
      <form onSubmit={(e) => handleSignUp(e, email, password)}>
        <br />
        <label>Name:</label> <br />
        <input
          name="name"
          type="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="enter name"
        />
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
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}
