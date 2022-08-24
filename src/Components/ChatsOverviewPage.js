import React from "react";
import { useState, useEffect } from "react"
import './Chatbox.css';
import { database } from "../Db/Firebase";
import { collection, query, getDocs, addDoc, orderBy, doc, getDoc, docs, where } from "firebase/firestore"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ChatsOverview() {

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
  const [chatIDs, setChatIDs] = useState([])
  const [bothUserIDs, setBothUserIDs] = useState([])
  const [otherUserID, setOtherUserID] = useState([])
  const [otherUsersInfo, setOtherUsersInfo] = useState([])

  //useEffect to check get the user's chats
useEffect(() => {
  const chatListRef = collection(database, "matches");
  getDocs(query(chatListRef, where('users', 'array-contains', `${currentUser.uid}`))).then(chats => {
    const myChats = chats.docs.map(chat =>
    ({
      data: chat.data(),
      id: chat.id
    }))
    console.log("all of the users chats: ", myChats)
    setChats(myChats)
  }).catch((error) => { alert(error.message) })
  }, [currentUser])

  useEffect(() => {
    chats.forEach(chat => {
      chatIDs.push(chat.id)
    })
    console.log("all the chat IDs: ", chatIDs)
  }, [chats])

  async function storeChatIDsInArray() {

  }

async function getAllUsersIDFunction (){
  for (let ID of chatIDs) {
    await getAllUsersID(ID)
    console.log("array of user IDs for all chat:", bothUserIDs)
  }
}



function storeOtherUsersID() {
    for (let i = 0; i<bothUserIDs.length; i++){
      if (bothUserIDs[i][0] === currentUser.uid){
        otherUserID.push(bothUserIDs[i][1])
      } else otherUserID.push(bothUserIDs[i][0])
    }
    setOtherUserID(otherUserID)
    console.log(otherUserID)
  }

  async function getAllUsersID(chatRoomID) {
    try {
      const usersListRef = doc(database, "matches", `${chatRoomID}`);
      const users = await getDoc(query(usersListRef))
      let usersArray = users.data().users
      // setBothUserIDs()
      bothUserIDs.push(usersArray)
      // console.log(bothUserIDs)
    } catch (error) { alert(error.message) }
    return
  }



  async function getOtherUsersInfo (ID) {
    try {
      const userInformationListRef = doc(database, "users", `${ID}`, "profile", `${ID}profile`);
      const userInfo = await getDoc(query(userInformationListRef))
      let userInfoToUse = userInfo.data()
      otherUsersInfo.push(userInfoToUse)
    } catch (error) { alert(error.message) }
    console.log(otherUsersInfo)
}

  async function getOtherUsersInfoFunction () {
    otherUserID.forEach(userID => {
      getOtherUsersInfo(userID)
    })
  }

//get chat ID - done
//store chat ID in array - done
//loop through array, for each chatID, get the list of usersID, if currentuserID is list[0], then otheruserID is list[1] and vice versa - done
//store otheruserIDs in an array  - done
//display otheruserIDs' profile details via map function

  return (
    <div>
      {currentUser.displayName}
      <button onClick={storeChatIDsInArray}>Store Chat IDs in array format</button>
      <button onClick={getAllUsersIDFunction}>Get both users' ID from the chat ID</button>
      <button onClick={storeOtherUsersID}>Get only the other users' ID in the chat and put them in an array</button>
      <button onClick={getOtherUsersInfoFunction}>Get the other users' profile details </button>

      {otherUsersInfo.map(user =>
        <div key={user.uid}>
          <div>{user.age}{user.name}{user.uid}</div>
        </div>)}

    </div>
  )
}

  // async function storeOtherUsersInfo(userID) {
  //   try {
  //     const userInformationListRef = doc(database, "users", userID, "profile", `${userID}profile`);
  //     const userInfo = await getDoc(query(userInformationListRef))
  //     let userInfoToUse = userInfo.data()
  //     console.log(userInfoToUse)
  //   } catch (error) { alert(error.message) }
  // }

  // async function () {
  //   try {
  //     const userInformationListRef = doc(database, "users", `HlEMUvoRtzRsidaRtjrDbcgQVOx1`, "profile", `HlEMUvoRtzRsidaRtjrDbcgQVOx1profile`);
  //     let userInfo = await getDoc(query(userInformationListRef))
  //     let userInfoToUse = userInfo.data()
  //     console.log(userInfoToUse)
  //     await setotherUsersInfoFunction(userInfoToUse)
  //   } catch (error) { alert(error.message) }
  // }

  
  // function getUsersProfileInformation() {
  //   const userInformationListRef = doc(database, "users", `HlEMUvoRtzRsidaRtjrDbcgQVOx1`, "profile", `HlEMUvoRtzRsidaRtjrDbcgQVOx1profile`);
  //   getDoc(query(userInformationListRef)).then((response) => {
  //     console.log(response.data())
  //   })
  // }

  // async function setUsersProfileInformation() {
  //   try {
  //     const userInformationListRef = doc(database, "users", `${otherUserID}`, "profile", `${otherUserID}profile`);
  //     const userInfo = await getDoc(query(userInformationListRef))
  //     let userInfoToUse = userInfo.data()
  //     await setUserInfoFunction(userInfoToUse)
  //   } catch (error) { alert(error.message) }
  // }

  // function getUsersProfileInformation() {
  //   const userInformationListRef = doc(database, "users", `HlEMUvoRtzRsidaRtjrDbcgQVOx1`, "profile", `HlEMUvoRtzRsidaRtjrDbcgQVOx1profile`);
  //   getDoc(query(userInformationListRef)).then((response) => {
  //     console.log(response.data())
  //   })
  // }

  // function getMessages() {
  //   const messageListRef = collection(database, "matches", `${chatRoomID}`, "messages");
  //   getDocs(query(messageListRef, orderBy('timestamp', 'desc')))
  //     .then(response => {
  //       const message = response.docs.map(doc =>
  //       ({
  //         data: doc.data(),
  //         id: doc.id,
  //       }))
  //       setMessages(message)
  //     }).catch((error) => { alert(error.message) })
  // }

  // async function setUsersProfileInformation() {
  //   try {
  //     const userInformationListRef = doc(database, "users", `${otherUserID}`, "profile", `${otherUserID}profile`);
  //     const userInfo = await getDoc(query(userInformationListRef))
  //     let userInfoToUse = userInfo.data()
  //     await setUserInfoFunction(userInfoToUse)
  //   } catch (error) { alert(error.message) }
  // }