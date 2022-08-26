import React from "react";
import { useState, useEffect } from "react"
import { database } from "../Db/Firebase";
import { collection, query, getDocs, doc, getDoc, where } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserDetails from "../components/UserDetails";

export default function ChatsOverview(props) {

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else setCurrentUser(null)
    });
  }, [])

  const [currentUser, setCurrentUser] = useState({})
  const [chats, setChats] = useState([])
  const [userIDs, setUserIDs] = useState([])
  const [otherUsersInfo, setOtherUsersInfo] = useState([])
  const [finalChatsInfo, setFinalChatsInfo] = useState([])

  useEffect(() => {
    getChatsAndOtherUserID()
  }, [currentUser])

  async function getChatsAndOtherUserID() {
    const q = query(collection(database, "matches"), where("users", "array-contains", `${currentUser.uid}`));
    const querySnapshot = await getDocs(q);
    let chatIDs = []
    let userIDs = []

    querySnapshot.forEach((doc) => {
      chatIDs = [...chatIDs, doc.id]

      if (doc.data().users[0] === currentUser.uid) {
        userIDs = [...userIDs, doc.data().users[1]]
      } else userIDs = [...userIDs, doc.data().users[0]]

    });
    setUserIDs(userIDs)
    setChats(chatIDs)
  }

  useEffect(() => {
    loopThroughUserIDs()
  }, [chats])

  function loopThroughUserIDs() {
    userIDs.forEach(userID => {
      getaSingleProfile(userID)
    })
  }

  async function getaSingleProfile(ID) {
    const docRef = doc(database, "users", ID, "profile", `${ID}_profile`,);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data())
      setOtherUsersInfo(arr => [...arr, docSnap.data()])
    } else {
      console.log("No such user!");
    }
  }


  useEffect(() => {
    console.log(otherUsersInfo)
    getFinalChatsInfo()
  }, [otherUsersInfo])


  function getFinalChatsInfo() {
    let arr = []
    for (let i = 0; i < chats.length; i++) {
      arr = [...arr, { chatID: chats[i], usersInfo: otherUsersInfo[i] }]
    }
    return setFinalChatsInfoFunction(arr)
  }

  function setFinalChatsInfoFunction(arr) {
    setFinalChatsInfo(arr)
  }



  useEffect(() => {
    props.setFinalChatsInfoTrigger(finalChatsInfo)
  }, [finalChatsInfo])


  return (

    <div className="chatContainer flex_center">
      {finalChatsInfo !== [] && finalChatsInfo.length >= 1 ? <UserDetails finalChatsInfo={finalChatsInfo} /> : null}
    </div>
  )
}