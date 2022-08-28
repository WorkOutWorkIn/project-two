import "./App.css";
import React from "react";
import { Links, Link, Route, Routes } from "react-router-dom";
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
import Chats from "./Components/chatComponents/Chats";
import Chatbox from "./Components/chatComponents/Chatbox";
import { UserContext } from "./Components/UserContext";
import Modal from "./Components/Modal";
import UserCards from "./Components/UserCards";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  // const [user, setUser] = useState("");

  const [currentChats, setCurrentChats] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return unsubscribe;
  // }, [user]);

  function setCurrentChatsInfo(e) {
    setCurrentChats(e);
  }

  return (
    <AuthProvider>
      <div className="App">
        <Sidebar />

        <header className="App-header">
          <Routes>
            <Route path="/*" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/usercards" element={<UserCards />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route
              path="/chats"
              element={
                <Chats
                  setFinalChatsInfoTrigger={(e) => setCurrentChatsInfo(e)}
                />
              }
            />

            {currentChats.length > 0
              ? currentChats.map((chat) => {
                  return (
                    <Route
                      key={chat.chatID}
                      path={`/${chat.chatID}`}
                      element={
                        <Chatbox
                          chatRoomID={chat.chatID}
                          otherUserID={chat.usersInfo.uid}
                          otherUserInfo={chat.usersInfo}
                        />
                      }
                    />
                  );
                })
              : null}
          </Routes>
          {/* <LandingPage />
          <Link to="./login" />
          <Link to="./signup" updateUser={setUser} />

          <Link to="/preferences" state={user} />
          <Link to="/profile" state={user} />
          <Link to="/profilepage" state={user} />
          <Link to="/usercards" state={user} /> */}
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
