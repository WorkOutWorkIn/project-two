import "./App.css";
import React from "react";
import { Links, Link, Route, Routes, useNavigate } from "react-router-dom";
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

import Modal from "./Components/Modal";
import UserCards from "./Components/UserCards";
import { AuthProvider } from "./Components/AuthContext";
import { Outlet } from "react-router-dom";

function App() {
  // const [user, setUser] = useState("");

  const [currentChats, setCurrentChats] = useState([]);
  const [renderSideBar, setRenderSideBar] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return unsubscribe;
  // }, [user]);

  function setCurrentChatsInfo(e) {
    if (e.length === 0) {
      console.log("e is empty");
    } else {
      setCurrentChats(e);

      console.log(currentChats, "e is not empty");
    }
  }

  const SidebarLayout = () => (
    <>
      <Sidebar />
      <Outlet />
    </>
  );

  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          {/* {showSideBar ? <Sidebar /> : ""} */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<SidebarLayout />}>
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
            </Route>
          </Routes>
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
