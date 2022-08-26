import Chatbox from "./components/Chatbox";
// import ChatsOverview from "./Components/ChatsOverviewPage";
import Register from "./components/Register"
import SignInPage from './components/SignInPage'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
// import Home from "./Components/Home";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react"
import Home from './components/Home'
import Chats from './components/Chats'

function App() {

  const [currentChats, setCurrentChats] = useState("")
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

  function signingOut() {
    signOut(getAuth()).then(() => {
      console.log("signed out!")

    }).catch((error) => {
      alert(error.message)
    });
  }


  function setCurrentChatsInfo(e) {
    setCurrentChats(e)
  }

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
        {!user ? <Link to="/register">Register</Link> : null}
        {!user ? <Link to="/signIn">Sign in</Link> : null}
        <Link to="/chats">See All Chats (only after login)</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/chats" element={<Chats setFinalChatsInfoTrigger={(e) => setCurrentChatsInfo(e)} />} />

        {currentChats.length > 0 ?
          currentChats.map(chat => {
            return <Route key={chat.chatID} path={`/${chat.chatID}`} element={<Chatbox chatRoomID={chat.chatID} otherUserID={chat.usersInfo.uid} otherUserInfo={chat.usersInfo} />} />
          })
          : null}

      </Routes>
      <button onClick={signingOut}>Sign Out!</button>
    </div>

  );
}

export default App;
