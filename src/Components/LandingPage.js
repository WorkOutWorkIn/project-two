import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import UserCards from "./UserCards";

export default function MainPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/registration");
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>MatchMage</h1>
      <Link to="/signup">
        <Button variant="text" onSubmit={handleSubmit}>
          Register
        </Button>
      </Link>
      <Link to="/login">
        <Button variant="text">Log In</Button>
      </Link>
    </div>
  );
}
