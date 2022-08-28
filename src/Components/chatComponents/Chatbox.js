
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../App";
import React from "react";
// import './Chatbox.css';
import { database } from "../Db/Firebase";
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, where, doc, getDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Chatbox.css'
// import { useNavigate } from "react-router-dom";

export default function Chatbox(props) {
  // chatRoomID = { chat.chatID } otherUserID = { chat.usersInfo.uid } otherUserInfo = { chat.usersInfo }

  const user = useContext(UserContext);
  setCurrentUser(user)


  const [currentUser, setCurrentUser] = useState({})
  const [currentUserDetails, setCurrentUserDetails] = useState({})
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")

  // function handleSubmit() {
  //   const messageListRef = collection(database, "matches", `${props.chatRoomID}`, "messages")
  //   addDoc(messageListRef, { message: currentMessage, displayName: currentUser.displayName, senderID: currentUser.uid, createdAt: serverTimestamp(), timestamp: new Date().toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }).then(response => {
  //   }).catch(error => { console.log(error.message) })
  //   setCurrentMessage("")
  // }

  //useEffect to get messages
  useEffect(() => {
    getMessages()
    if (currentUser.uid) {
      getCurrentUserDetails()
    }
  }, [currentUser])


  async function getCurrentUserDetails() {
    const docRef = doc(database, "users", currentUser.uid, "profile", `${currentUser.uid}_profile`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrentUserDetails(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  async function getMessages() {
    const querySnapshot = await getDocs(query(collection(database, "matches", props.chatRoomID, "messages"), orderBy('createdAt')));
    let messagesArray = []
    querySnapshot.forEach((doc) => {
      messagesArray = [...messagesArray, { id: doc.id, data: doc.data() }]
      // doc.data() is never undefined for query doc snapshots
    });
    setMessages(messagesArray)
  }

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
        <div>Here's a fun fact about {props.otherUserInfo.name}:
          <div className="flex left">
            {props.otherUserInfo.funfact}
          </div>
        </div>
      </div>

      <div className="chatbox__main flex right">
        <div>We shared your fun fact to {props.otherUserInfo.name}:
          <div className="flex right">
            {currentUserDetails.funfact}
          </div>
        </div>
      </div>

      <div className="chatbox__display flex">
        {messages.map(message =>
          //each message
          <div key={message.id}>
            {message.data.senderID === currentUser.uid ?
              //current user's messages
              <div className="flex right">
                {message.data.name}: {message.data.message}{currentUserDetails.image[0]}
              </div> :
              //other user's messages
              <div className="flex left">
                {props.otherUserInfo.image[0]}{message.data.name}: {message.data.message}
              </div>}
          </div>)}
      </div>

      <div className="chatbox__text">

        <p >input text screen here</p>
        <input className="inputField" type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} /><br />
        <button type="submit" onClick={handleSubmit} disabled={currentMessage === ""}>send</button>
      </div>
      <br />
    </div>

  )
}