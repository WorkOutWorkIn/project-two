import React from "react";
import { useState, useEffect, useContext } from "react"
// import './Chatbox.css';
import { database } from "../Db/Firebase";
import { collection, getDocs, addDoc, serverTimestamp, } from "firebase/firestore"
import { UserContext } from "../../App";


export default function Chatbox(props) {


  const user = useContext(UserContext);
  setCurrentUser(user)


  const [currentUser, setCurrentUser] = useState({})
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")


  //useEffect to get messages
  useEffect(() => {
    getMessages()
  }, [currentUser])


  async function getMessages() {
    const querySnapshot = await getDocs(collection(database, "matches", props.chatRoomID, "messages"));
    let messagesArray = []
    querySnapshot.forEach((doc) => {
      messagesArray = [...messagesArray, { id: doc.id, data: doc.data() }]
      console.log(doc.id, " => ", doc.data());
    });
    setMessages(messagesArray)
  }

  useEffect(() => {
    console.log(messages)
  }, [messages])


  //submitbutton
  function handleSubmit() {
    submitMessage()
  }


  async function submitMessage() {
    const docRef = await addDoc(collection(database, "matches", props.chatRoomID, "messages"), {
      name: currentUser.displayName,
      message: currentMessage,
      senderID: currentUser.uid,
      createdAt: serverTimestamp()
    });
    setCurrentMessage("")
    getMessages()
    console.log("Document written with ID: ", docRef.id);
  }




  return (
    <div className="chatbox flex center">
      <div className="chatbox__header flex left">
        {/* templated message, taking in other user's displayName */}
        <p>It's a match! You and {props.otherUserInfo.name} like each other!<br />
          Get to know each other and if sparks fly, take the conversation offline to meet up in person.<br />
          This chat closes automatically after 7 days of inactivity</p>
      </div>


      {/* random fact about user plus other user */}
      <div className="chatbox__other flex">
        <p>Here's a random fact about {props.otherUserInfo.name}:<br />
          {props.otherUserInfo.funfact}

        </p>
      </div>


      <div className="chatbox__display flex">
        {messages.map(message =>
          <div key={message.id}>
            {message.data.senderID === currentUser.uid ? <div className="flex right">{message.data.name}: {message.data.message} </div> : <div className="flex left">{message.data.name}: {message.data.message}</div>}
          </div>)}
      </div>

      <div className="chatbox__text">

        <p>input text screen here</p>
        <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} /><br />
        <button type="submit" onClick={handleSubmit} disabled={currentMessage === ""}>send</button>
      </div>
      <br />
    </div>

  )
}