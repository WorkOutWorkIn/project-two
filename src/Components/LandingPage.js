import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function MainPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/registration");
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>MatchMage</h1>
      {/* route to register */}
      <Button variant="text" onSubmit={handleSubmit}>
        Register
      </Button>
      {/* route to login */}
      <Button variant="text">Log In</Button>
    </div>
  );
}
