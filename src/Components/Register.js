import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";


export default function Register() {


  // const [user, setCurrentUser] = useState("")
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid)
        // const uid = user.uid;
        // // console.log(uid)
        // setCurrentUser(user)
      }
    });
  }, [])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userUID, setUserUID] = useState("")
  const auth = getAuth();

  async function handleSubmit(e) {

    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {

        console.log(userUID)
      }).catch((error) => {
        alert(error.message)
      });
      await updateProfile(auth.currentUser, { displayName: name }).catch(
        (err) => console.log(err)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
        Email: <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
        Password: <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  )

}