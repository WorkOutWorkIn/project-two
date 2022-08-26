import "./App.css";
import React from "react";
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { createContext, useState, useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import Preferences from "./Components/Preferences";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Profile from "./Components/Profile";
import Sidebar from "./Components/Sidebar";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "./Db/Firebase";
import ProfilePage from "./Components/ProfilePage";
import Chats from './components/Chats'
import Chatbox from "./components/Chatbox";


export const UserContext = createContext();

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, [user]);

  console.log(user);

  function setCurrentChatsInfo(e) {
    setCurrentChats(e)
  }

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Sidebar />

        <header className="App-header">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login updateUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/preferences"
              element={<Preferences CurrentUser={user} />}
            />
            <Route path="/profile" element={<Profile CurrentUser={user} />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            {currentChats.length > 0 ?
              currentChats.map(chat => {
                return <Route key={chat.chatID} path={`/${chat.chatID}`} element={<Chatbox chatRoomID={chat.chatID} otherUserID={chat.usersInfo.uid} otherUserInfo={chat.usersInfo} />} />
              })
              : null}
          </Routes>
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
