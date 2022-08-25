import Chatbox from "./Components/Chatbox";
// import ChatsOverview from "./Components/ChatsOverviewPage";
import RegisterPage from "./Components/RegisterPage"
import SignInPage from './Components/SignInPage'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react"
import ChatsOverview from "./Components/ChatsOverviewPage";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [user, setCurrentUser] = useState("")
  const [currentChats, setCurrentChats] = useState("")
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else setCurrentUser(null)
    });
  }, [])

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
        <Link to="/chats">See All Chats</Link>
        {!user ? <Link to="/register">Register</Link> : null}
        {!user ? <Link to="/signIn">Sign in</Link> : null}

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatsOverview setFinalChatsInfoTrigger={(e) => setCurrentChatsInfo(e)} />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/chat" />} />
        <Route path="/signIn" element={<SignInPage />} />

        {currentChats.length > 0 ?
          currentChats.map(chat => {
            return <Route key={chat.chatID} path={`/${chat.chatID}`} element={<Chatbox chatRoomID={chat.chatID} otherUserID={chat.usersInfo.uid} otherUserInfo={chat.usersInfo} />} />
          })
          : null}

      </Routes>
    </div>

  );
}

export default App;
