import React from "react";
import { useState, useEffect, useRef } from "react";
import { database } from "../../Db/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Chatbox.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../AuthContext";

export default function Chatbox(props) {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const imageInputRef = useRef();

  useEffect(() => {
    console.log(user);
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    getMessages();
    if (currentUser.uid) {
      getCurrentUserDetails();
    }
  }, [currentUser]);

  async function getMessages() {
    const querySnapshot = await getDocs(
      query(
        collection(database, "matches", props.chatRoomID, "messages"),
        orderBy("createdAt")
      )
    );
    let messagesArray = [];
    querySnapshot.forEach((doc) => {
      messagesArray = [...messagesArray, { id: doc.id, data: doc.data() }];
      // doc.data() is never undefined for query doc snapshots
    });
    setMessages(messagesArray);
  }

  async function getCurrentUserDetails() {
    const docRef = doc(
      database,
      "users",
      currentUser.uid,
      "profile",
      `${currentUser.uid}_profile`
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrentUserDetails(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  //submitbutton
  function handleSubmit() {
    submitMessage();
  }

  async function submitMessage() {
    const docRef = await addDoc(
      collection(database, "matches", props.chatRoomID, "messages"),
      {
        name: currentUser.displayName,
        message: currentMessage,
        senderID: currentUser.uid,
        media: imageUrl,
        createdAt: serverTimestamp(),
      }
    );
    setCurrentMessage("");
    setImage(null);
    imageInputRef.current.value = "";
    getMessages();
  }

  const fileSelectedHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const fileUploadedHandler = () => {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `chatimages/${props.chatRoomID}/${currentUser.uid}/${image.name}`
    );
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        // console.log(snapshot.metadata.fullPath);
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        setImageUrl(url);
      });
  };

  useEffect(() => {
    if (image) {
      fileUploadedHandler();
    } else console.log("image not yet uploaded");
  }, [image]);

  return (
    <div className="chatbox flex center">
      <div className="chatbox__header flex lefty">
        {/* templated message, taking in other user's displayName */}
        <p>
          It's a match! You and {props.otherUserInfo.name} like each other!
          <br />
          Get to know each other and if sparks fly, take the conversation
          offline to meet up in person.
          <br />
          This chat closes automatically after 7 days of inactivity
        </p>
      </div>

      {/* random fact about user plus other user */}
      <div className="chatbox__other flex">
        <div>
          Here's a fun fact about {props.otherUserInfo.name}:
          <div className="flex left">{props.otherUserInfo.funfact}</div>
        </div>
      </div>

      <div className="chatbox__main flex righty">
        <div>
          We shared your fun fact to {props.otherUserInfo.name}:
          <div className="flex right">{currentUserDetails.funfact}</div>
        </div>
      </div>

      <div className="chatbox__display flex">
        {messages.map((message) => (
          //each message
          <div key={message.id}>
            {message.data.senderID === currentUser.uid ? (
              //current user's messages
              <div className="flex right">
                {message.data.name}: {message.data.message}
                {currentUserDetails.image[0]}
                {message.data.media !== "" ? (
                  <img src={message.data.media} alt="imageupload" />
                ) : null}
              </div>
            ) : (
              //other user's messages
              <div className="flex left">
                {props.otherUserInfo.image[0]}
                {message.data.name}: {message.data.message}
                {message.data.media !== "" ? (
                  <img src={message.data.media} alt="imageupload" />
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="chatbox__text">
        <div className="chatInput">
          <input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder={`type your message...`}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={currentMessage === "" && !image}
          >
            send
          </button>

          <input
            type="file"
            onChange={fileSelectedHandler}
            ref={imageInputRef}
          />
        </div>
      </div>
      <br />
    </div>
  );
}
