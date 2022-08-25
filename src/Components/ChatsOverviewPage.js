import React from "react";
import { useState, useEffect } from "react"
import './Chatbox.css';
import { database } from "../Db/Firebase";
import { collection, query, getDocs, doc, getDoc,  where } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link, Route, } from 'react-router-dom'
import Chatbox from "./Chatbox";

export default function ChatsOverview(props) {


  //useEffect for user auth
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else setCurrentUser(null)
    });
  }, [])
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [chats, setChats] = useState([])
  const [otherUserIDs, setOtherUserIDs] = useState([])
  const [otherUsersInfo, setOtherUsersInfo] = useState([])
  const [finalChatsInfo, setFinalChatsInfo] = useState([])
  const [stateCount, setStateCount] = useState(0)

//useEffect to get the user's chats
useEffect(() => {
  const chatListRef = collection(database, "matches");
  getDocs(query(chatListRef, where('users', 'array-contains', `${currentUser.uid}`))).then(chats => {
    const myChats = chats.docs.map(chat =>
    ({
      data: chat.data(),
      id: chat.id
    }))
    setChats(myChats)
    
  }).catch((error) => { alert(error.message) })
  }, [currentUser])


  //useEffect to get other users ids based off from the chatID
useEffect(() => {
for (let i=0;i<chats.length;i++){
  if (currentUser.uid === chats[i].data.users[0] && !otherUserIDs.includes(chats[i].data.users[1]))
  {
    setOtherUserIDs(arr=> [...arr, chats[i].data.users[1]])
  } else if (currentUser.uid === chats[i].data.users[1] && !otherUserIDs.includes(chats[i].data.users[0])){
    setOtherUserIDs(arr => [...arr, chats[i].data.users[0]])
  }
}
setStateCount(1)

 // eslint-disable-next-line
  }, [chats])

  //useEffect to get other users' info
useEffect(() => {
function getOtherUsersInfo(ID) {
      const userInformationListRef = doc(database, "users", `${ID}`, "profile", `${ID}profile`);
      const userInfo = getDoc(query(userInformationListRef)).then((response)=>{
        let userInfoToUse = response.data()
        setOtherUsersInfo(arr => [...arr, userInfoToUse])
      })
  }

  otherUserIDs.forEach(userID=>{
    getOtherUsersInfo(userID)
  })
  
  // eslint-disable-next-line
  }, [otherUserIDs])

  useEffect(() => {

    for (let i = 0; i < chats.length; i++) {
      setFinalChatsInfo(arr => [...arr, { chatID: chats[i].id, usersInfo: otherUsersInfo[i] }])
    }
  }, [otherUsersInfo])


  useEffect(() => {
    props.setFinalChatsInfoTrigger(finalChatsInfo)
  }, [finalChatsInfo])



  return (
    
    <div>
      {currentUser.displayName}  
      <button onClick={() => console.log("chats: ", chats, "other user IDs: ", otherUserIDs)}>console logs</button>
      <button onClick={() => console.log("finalchatsinfo: ", finalChatsInfo)}>console logs</button>

      
      {finalChatsInfo ? <div>      {finalChatsInfo.map(chat =>
        <div key={chat.chatID}>
          <div>{chat.usersInfo.name}{chat.usersInfo.url}{chat.chatID}</div>
          <Link to={`/${chat.chatID}`}>Go there</Link>
          
        </div>)}</div> : null}
    </div>
  )
}

// {
//   finalChatsInfo.map(chat =>
//     <div key={chat.ID}>
//       <div>{chat.usersInfo.name}{chat.usersInfo.url}</div>
//       <button onClick={goToChat} value={chat.chatID}>go to this chat</button>


//     </div>)
// }

{/* <Link to={`/chat/${user.uid}`}>Go to this chatroom</Link> */}

//   useEffect(() => {
// for (let i=0;i<chats.length;i++){
//   if (currentUser.uid === chats[i].data.users[0] && !otherUserIDs.includes(chats[i].data.users[1]))
//   {
//     otherUserIDs.push(chats[i].data.users[1])
//   } else if (currentUser.uid === chats[i].data.users[1] && !otherUserIDs.includes(chats[i].data.users[0])){
//     otherUserIDs.push(chats[i].data.users[0])
//   }
// }
//   }, [chats])

//get chat ID - done
//store chat ID in array - done
//loop through array, for each chatID, get the list of usersID, if currentuserID is list[0], then otheruserID is list[1] and vice versa - done
//store otheruserIDs in an array  - done
//display otheruserIDs' profile details via map function


// async function storeChatIDsInArray() {
//   chats.forEach(chat => {
//     chatIDs.push(chat.id)
//   })
//   console.log("all the chat IDs: ", chatIDs)
// }

// async function getAllUsersIDFunction() {
//   for (let ID of chatIDs) {
//     await getAllUsersID(ID)
//     console.log("array of user IDs for all chat:", bothUserIDs)
//   }
// }

// function storeOtherUsersID() {
//   for (let i = 0; i < bothUserIDs.length; i++) {
//     if (bothUserIDs[i][0] === currentUser.uid) {
//       otherUserID.push(bothUserIDs[i][1])
//     } else otherUserID.push(bothUserIDs[i][0])
//   }
//   setOtherUserID(otherUserID)
//   console.log(otherUserID)
// }

// async function getAllUsersID(chatRoomID) {
//   try {
//     const usersListRef = doc(database, "matches", `${chatRoomID}`);
//     const users = await getDoc(query(usersListRef))
//     let usersArray = users.data().users
//     // setBothUserIDs()
//     bothUserIDs.push(usersArray)
//     // console.log(bothUserIDs)
//   } catch (error) { alert(error.message) }
//   return
// }


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