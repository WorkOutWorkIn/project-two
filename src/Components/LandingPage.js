import React from "react";
import { useNavigate, Link } from "react-router-dom";

import UserCards from "./UserCards";
import "../LandingPage.css";

export default function MainPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/registration");
  };

  return (
    <div className="landing-container">
      <h1 style={{ color: "black" }}>MatchMage</h1>
      <div className="button-container">
        <Link to="/signup">
          <button className="left-side" onSubmit={handleSubmit}></button>
        </Link>
        <div className="cleavage-cover"></div>
        <Link to="/login">
          <button className="right-side"></button>
        </Link>
      </div>
    </div>
  );
}
