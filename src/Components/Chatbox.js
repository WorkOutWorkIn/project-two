import React from "react";
import './Chatbox.css';

export default function Chatbox() {

  let otherUsername = "IU"
  let mainUserRandomFact = "My name is Darren"
  let otherUserRandomFact = "I am a singer"
  let chat = [{ user: "Darren", message: "hello" }, { user: "IU", message: "hello too" }]

  return (
    <div className="chatbox flex center">
      <div className="chatbox__header flex center">
        {/* templated message, taking in other user's displayName */}
        <p>It's a match! You and {otherUsername} like each other!
          Get to know each other and if sparks fly, take the conversation offline to meet up in person.
          This chat closes automatically after 7 days of inactivity</p>
      </div>


      {/* random fact about user plus other user */}
      <div className="chatbox__other flex">
        <p>Here's a random fact about {otherUsername}:<br />
          {otherUserRandomFact}
        </p>
      </div>
      <div className="chatbox__main flex">
        <p>Random fact about you that was shared to {otherUsername}:<br />
          {mainUserRandomFact}
        </p>
      </div>


      <div className="chatbox__display flex center">
        {chat.map((message) => (
          <div><p>{message.user} and {message.message}</p></div>
        ))}
      </div>


      <div className="chatbox__text">
        {/* texbot for user to input his/her message to send */}
        <p>input text screen here</p>
      </div>
    </div>
  )
}