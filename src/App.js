import Chatbox from "./Components/Chatbox";
// import ChatsOverview from "./Components/ChatsOverviewPage";
import RegisterPage from "./Components/RegisterPage"
import SignInPage from './Components/SignInPage'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react"
import ChatsOverview from "./Components/ChatsOverviewPage";


function App() {


  const [user, setCurrentUser] = useState("")
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName, "signed in!")
        setCurrentUser(user)
      } else setCurrentUser(null)
    });
  }, [])



  return (
    <div>
      <nav id="navbar"
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          display: "flex",
          gap: "4vw",
          backgroundColor: "black",
          padding: "3vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Link to="/">Home Page</Link>
        <Link to="/chats">See All Chats</Link>
        {!user ? <Link to="/register">Register</Link> : null}
        {!user ? <Link to="/signIn">Sign in</Link> : null}
        <Link to="/chat">See Chatbox</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={user ? <ChatsOverview /> : <Navigate to="/signIn" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/chat" />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/chat" element={user ? <Chatbox /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
