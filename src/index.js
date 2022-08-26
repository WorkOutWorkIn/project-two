import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Profile from "./Components/Profile";
import UserCards from "./Components/UserCards";
import LandingPage from "./Components/LandingPage";
import Preferences from "./Components/Preferences";
import ProfilePage from "./Components/ProfilePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/usercards" element={<UserCards />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/landingpage" element={<LandingPage />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/profilepage" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
