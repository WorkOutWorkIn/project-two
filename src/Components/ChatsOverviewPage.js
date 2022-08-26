import React from "react";
import { useState, useEffect } from "react"
import { database } from "../Db/Firebase";
import { collection, query, getDocs, doc, getDoc,  where, onSnapshot } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom'
import './ChatsOverview.css';

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

  const [currentUser, setCurrentUser] = useState({})
  const [chats, setChats] = useState([])
  const [otherUserIDs, setOtherUserIDs] = useState([])
  const [otherUsersInfo, setOtherUsersInfo] = useState([])
  const [finalChatsInfo, setFinalChatsInfo] = useState([])



//useEffect to get the user's chats
useEffect(() => {

  onSnapshot(collection(database, 'matches'), where('users', 'array-contains', `${currentUser.uid}`) , (snapshot) => {
     snapshot.docs.forEach((doc) => { console.log(doc.data()) })
    setChats(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
  })
  console.log(chats);
}, [currentUser])

  // const chatListRef = collection(database, "matches");
  // getDocs(query(chatListRef, where('users', 'array-contains', `${currentUser.uid}`))).then(chats => {
  //   const allOfUsersChats = chats.docs.map(chat =>
  //   ({
  //     data: chat.data(),
  //     id: chat.id
  //   }))
  //   setChats(allOfUsersChats)
    
  // }).catch((error) => { alert(error.message) })
  // }, [currentUser])


//useEffect to get other users ids based off from the chatID
  useEffect(() => {
    grabOtherUserIDs()
  }, [chats])

function grabOtherUserIDs () {
  let arr = []
  for (let i = 0; i < chats.length; i++) {
    if (currentUser.uid === chats[i].data.users[0] && !otherUserIDs.includes(chats[i].data.users[1])) {
      arr = [...arr, chats[i].data.users[1]]
    } else if (currentUser.uid === chats[i].data.users[1] && !otherUserIDs.includes(chats[i].data.users[0])) {
      arr = [...arr, chats[i].data.users[0]]
    }
  }
  return functionToSetState(arr)
}

function functionToSetState(arr) {
  setOtherUserIDs(arr)
}

 


  //useEffect to get other users' info
useEffect(() => {

  otherUserIDs.forEach(userID => {
    getOtherUsersInfo(userID)
  })

  }, [otherUserIDs])


  function getOtherUsersInfo(ID) {
    const otherUserInformationListRef = doc(database, "users", `${ID}`, "profile", `${ID}_profile`);

    getDoc(otherUserInformationListRef).then((response) => {
      let otherUserInfoToUse = response.data()
      setOtherUsersInfo(arr => [...arr, otherUserInfoToUse])
    })
  }



  //useEffect to set the other users' IDs and their information into a single state
  useEffect(() => {

    getFinalChatsInfo()

  }, [otherUsersInfo])


  function getFinalChatsInfo() {
    let arr = []
    for (let i = 0; i < chats.length; i++) {
      arr = [...arr, { chatID: chats[i].id, usersInfo: otherUsersInfo[i] }]
    }
    return setFinalChatsInfoFunction(arr)
  }

  function setFinalChatsInfoFunction(arr) {
    setFinalChatsInfo(arr)
  }



//send props back to parent for routes
  useEffect(() => {
    props.setFinalChatsInfoTrigger(finalChatsInfo)
  }, [finalChatsInfo])



  return (
    
    <div className="chatContainer flex_center">
      <button onClick={() => console.log("currentuseruid: ", currentUser.uid)}>console logs</button>
      <button onClick={() => console.log("chats: ", chats)}>console logs</button>
      <button onClick={() => console.log("chats: ", chats, "other user IDs: ", otherUserIDs)}>console logs</button>
      <button onClick={() => console.log("finalchatsinfo: ", finalChatsInfo)}>console logs</button>

      <div className="heading Container flex_center"><h1>Your chat Rooms</h1></div>
      {finalChatsInfo.length === chats.length ? 
      
      <div className="middleChatContainer">
        
         {finalChatsInfo.map(chat =>
        <div className="individualChatContainer" key={chat.chatID}>

          <div>{chat.usersInfo.name}<br/>
               <img src={chat.usersInfo.url} alt="profile"/></div>
          <button className="button"><Link to={`/${chat.chatID}`}>Go there</Link></button>
          
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