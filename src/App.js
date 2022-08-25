import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
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
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup updateUser={setUser} />} />

            <Route
              path="/preferences"
              element={<Preferences CurrentUser={user} />}
            />
            <Route path="/profile" element={<Profile CurrentUser={user} />} />
            <Route
              path="/profilepage"
              element={<ProfilePage CurrentUser={user} />}
            />
          </Routes>
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
