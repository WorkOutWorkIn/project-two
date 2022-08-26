// import React, { useState } from "react";

// export default function Test() {

//   const [variable, setVariable] = useState("hello")

//   function delay(time) {
//     return new Promise((resolve, reject) => {
//       if (isNaN(time)) {
//         reject(new Error('error!'))
//       } else setTimeout(resolve, time)

//     });
//   }

//   function setup() {
//     delayES8(10000)
//       .then(setVariable("goodbye"))
//       .catch((err) => console.log(err))
//   }

//  async function delayES8(time){
//     //this function returns a promise
//     await delay(time);
//     await someThingElse();
//     let val = await somethingElseInstead();
//     return val
//   }

//   return (
//     <div>
//       <button onClick={setup}>click me</button>
//       {variable}
//     </div>
//   )
// }


// currentUser {uid, name, email}

// using current User, get the chat that has my uid in their array

// currently have: [[userid1, currentuserID], [currentuserID, userid2], [currentuserID, userid3]]

// locally do a loop, to get the other person's uid
// [[userid1], [userid2], [userid3]]

// with the other person's uid, i can then grab their profile information

// [[userid1], [userid2], [userid3]]
// [{userid1info}, {userid2info}, {userid3info}]

// [[chatroom1: chatroomID1, {userid1info}], [chatroom2: chatroomID2, {userid2info}], ...]