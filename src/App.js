import "./App.css";
import React from "react";
import { Links, Link } from "react-router-dom";
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

import Modal from "./Components/Modal";
import UserCards from "./Components/UserCards";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  console.log(user);
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Sidebar />

        <header className="App-header">
          {/* <Link to="/login" />
          <Link to="/signup" updateUser={setUser} />

          <Link to="/preferences" CurrentUser={user} />
          <Link to="/profile" CurrentUser={user} />
          <Link to="/profilepage" CurrentUser={user} /> */}
          <Link to="/usercards" state={user} />
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
