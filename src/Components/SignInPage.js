import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Db/Firebase'

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [userUID, setUserUID] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // setUserUID(userCredential.user.uid)
      console.log(userCredential.user)
    }
    ).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Email: <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
        Password: <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
        <button type="submit">Log In</button>
      </form>

    </div>
  )
}