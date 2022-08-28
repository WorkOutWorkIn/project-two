import React, { useState } from "react";
import "./Modal.css";
import lovePotion from "../misc/love-potion2.png";
import xIcon from "../misc/x-icon.png";
import { Link } from "react-router-dom";
import loveLetter from "../misc/message-letter.png";

const Modal = (props) => {
  // if (!open) return null;
  const user2 = props.user2;
  const modal = props.setModalOpen;
  console.log(user2, props.user1, "props in modal");

  const [options, setOptions] = useState([props.user1, user2]);

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
                <div className="name-text">{options[0].name}</div>
              </div>
            </div>
            <div className="more-animation">
              <img src={lovePotion} className="love-potion" alt="love-potion" />
            </div>

            <div className="person" key={user2.name}>
              <div
                className="image"
                style={{ backgroundImage: `url(${user2.image})` }}
              >
                <div className="name-text">{options[1].name}</div>
              </div>
            </div>
          </div>
          <div className="match-text-container">
            You've matched!
            <Link to="/profile">
              <button className="message-button">
                Drop a message? <img src={loveLetter} className="love-letter" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
