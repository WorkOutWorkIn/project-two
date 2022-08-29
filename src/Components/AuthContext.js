import React, { useContext, useEffect, useState } from "react";
import { auth, database } from "../Db/Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  async function signup(name, email, password) {
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

          setDoc(
            doc(
              database,
              `userstest2`,
              `${cred.user.uid}`,
              `hearts`,
              `${cred.user.uid}_hearts`
            ),
            {
              uid: [],
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
  }

  async function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in! Welcome!", userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      console.log(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
