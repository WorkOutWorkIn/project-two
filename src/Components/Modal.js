import React, { useState } from "react";
import "./Modal.css";
import lovePotion from "../misc/love-potion.png";
import xIcon from "../misc/x-icon.png";
import { Link } from "react-router-dom";

const Modal = (props) => {
  // if (!open) return null;
  const user2 = props.user2;
  const modal = props.setModalOpen;

  const [options, setOptions] = useState([
    {
      email: "allie@allie.com",
      image:
        "https://img.freepik.com/premium-vector/chicken-pixel-art-style_475147-1485.jpg",
      name: "allie",
    },
    user2,
  ]);

  return (
    <div>
      <div className="modal-container">
        <button
          className="exit-button"
          onClick={() => props.setModalOpen(false)}
        />

        <div className="actual-content">
          <div className="option-container">
            <div className="person" key={options[0].name}>
              <div
                className="image"
                style={{ backgroundImage: `url(${options[0].image})` }}
              >
                <h3>{options[0].name}</h3>
              </div>
            </div>
            <img src={lovePotion} className="love-potion" alt="love-potion" />

            <div className="person" key={user2.name}>
              <div
                className="image"
                style={{ backgroundImage: `url(${user2.image})` }}
              >
                <h3>{options[1].name}</h3>
              </div>
            </div>
          </div>
          <div className="match-text-container">
            You've matched!
            <Link to="/profile">
              <button>Would you like to send a message?</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
