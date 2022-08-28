import React from "react";
import { useState, useEffect, useContext } from "react";
import { database } from "../../Db/Firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import UserDetails from "./UserDetails";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Chats.css";
import { Link, Route, Routes } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Chatbox from "./Chatbox";

export default function Chats(props) {
  console.log("in chats");

  const [currentUser, setCurrentUser] = useState({});
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [userIDs, setUserIDs] = useState([]);
  const [otherUsersInfo, setOtherUsersInfo] = useState([]);
  const [finalChatsInfo, setFinalChatsInfo] = useState([]);

  useEffect(() => {
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser.uid) {
      getChatsAndOtherUserID();
    }
    console.log(currentUser.uid, "current user in 2nd use effect");
  }, [currentUser]);

  async function getChatsAndOtherUserID() {
    const q = query(
      collection(database, "matches"),
      where("users", "array-contains", `${currentUser.uid}`)
    );
    const querySnapshot = await getDocs(q);
    let chatIDs = [];
    let userIDs = [];

    querySnapshot.forEach((doc) => {
      chatIDs = [...chatIDs, doc.id];

      if (doc.data().users[0] === currentUser.uid) {
        userIDs = [...userIDs, doc.data().users[1]];
      } else userIDs = [...userIDs, doc.data().users[0]];
    });
    setUserIDs(userIDs);
    setChats(chatIDs);
  }

  useEffect(() => {
    if (chats.length > 0) {
      loopThroughUserIDs();
    }
    console.log(chats, "chats use effect");
  }, [chats]);

  function loopThroughUserIDs() {
    userIDs.forEach((userID) => {
      getaSingleProfile(userID);
    });
  }

  async function getaSingleProfile(ID) {
    const docRef = doc(database, "userstest2", ID, "profile", `${ID}_profile`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setOtherUsersInfo((arr) => [...arr, docSnap.data()]);
    } else {
      console.log("No such user!");
    }
  }

  useEffect(() => {
    if (otherUsersInfo.length === chats.length) {
      getFinalChatsInfo();
    } else {
      console.log("generating final chats info");
    }
  }, [otherUsersInfo]);

  function getFinalChatsInfo() {
    let arr = [];
    for (let i = 0; i < chats.length; i++) {
      arr = [...arr, { chatID: chats[i], usersInfo: otherUsersInfo[i] }];
    }
    return setFinalChatsInfoFunction(arr);
  }

  function setFinalChatsInfoFunction(arr) {
    setFinalChatsInfo(arr);
  }

  useEffect(() => {
    props.setFinalChatsInfoTrigger(finalChatsInfo);
  }, [finalChatsInfo]);

  return (
    <div>
      <div>
        {finalChatsInfo !== [] && finalChatsInfo.length >= 1 ? (
          <UserDetails finalChatsInfo={finalChatsInfo} />
        ) : null}
      </div>
    </div>
  );
}
