import React, { useState, useEffect, useContext } from "react";
import {
  collectionGroup,
  query,
  orderBy,
  limit,
  onSnapshot,
  getInstance,
  getDocs,
  collection,
  where,
  docs,
  doc,
  getDoc,
  DocumentSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { database as db } from "../Db/Firebase";
import "./UserCards.css";
import Modal from "./Modal";
// import { UserContext } from "../App";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
import xIcon from "../misc/pixel-x.png";
import Sidebar from "./Sidebar";

const UserCards = (props) => {
  console.log("in usercards");
  const location = useLocation();
  const data = location.state;
  console.log(data, "data");
  const { user } = useAuth();

  // const contextData = useContext(UserContext);
  // console.log(contextData, "context data");

  const [contextstuff, setContextStuff] = useState(props.CurrentUser);
  const [options, setOptions] = useState([]);
  const [optionsQuery, setOptionsQuery] = useState([]);
  const [currentUser, setCurrentPlayer] = useState(user.uid);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState({});
  const [flyOff, setFlyOff] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      // 1) query userstest collection n save docs
      // 2) query in each doc -> subcollection -> profile
      // 3) save profiles mapped into options array
      console.log("in async get users");
      try {
        const queryRef = query(collectionGroup(db, "profile"));
        const data = [];
        const q = await getDocs(queryRef);
        q.forEach((doc) => {
          data.push(doc.data());
        });

        const filteredData = data.filter((obj) => {
          return (
            obj.uid !== currentUser &&
            obj.uid !== "wYniduJymrYezQh4xBmLZozBEpC2"
          );
        });
        setOptions(...options, filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    console.log(options, "in use effect");
  }, []);

  const handleClickX = (person, index) => {
    console.log("clicked X", person, index);
    setOptions([
      ...options.slice(0, index),
      ...options.slice(index + 1, options.length),
    ]);

    console.log(options, "options in handle x");
  };
  const handleClickYes = (person, index) => {
    console.log("clicked heart");
    console.log(options[index], person);
    setCurrentOption(options[index]);
    setModalOpen(true);

    // add current user to person heart collection
    const addUIDToPerson = async () => {
      const queryRef = doc(
        db,
        "userstest",
        person.uid,
        "hearts",
        `${person.uid}_hearts`
      );

      const q = await setDoc(queryRef, {
        uid: currentUser,
      });
      checkUID();
    };
    // check if person uid exists in current user heart collection
    const checkUID = async () => {
      const queryRef = doc(
        db,
        "userstest",
        currentUser,
        "hearts",
        `${currentUser}_hearts`
      );

      try {
        const q = getDoc(queryRef).then((snapshot) => {
          console.log(snapshot.data().uid, person.uid);
          if (snapshot.data().uid !== person.uid) {
            generateArray();
            console.log("user does not exist in current hearts");
          } else {
            console.log("uid already exists in current user hearts");
          }
        });

        setOptions([
          ...options.slice(0, index),
          ...options.slice(index + 1, options.length),
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    // if exists, auto-gen doc id, create user array with both uids
    const generateArray = async () => {
      const docRef = await addDoc(collection(db, "matches"), {
        users: [currentUser, person.uid],
      });
    };
    addUIDToPerson();
  };

  return (
    <div className="swipe-container">
      {modalOpen ? (
        <div className="popup-container">
          <Modal
            setModalOpen={setModalOpen}
            user2={currentOption}
            user1={user}
          />
        </div>
      ) : null}

      {options.map((person, index) => (
        <div className="swipe" key={person.name}>
          <div
            className="card"
            style={{ backgroundImage: `url(${person.image})` }}
          >
            <h3>{person.name}</h3>
          </div>
          <div className="buttons">
            <button
              className="x-button"
              onClick={() => handleClickX(person, index)}
            />

            <button
              className="heart-button"
              onClick={() => handleClickYes(person, index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCards;

// const q = database
//   .collection("user")
//   .onSnapshot((snapshot) =>
//     setOptions(snapshot.docs.map((doc) => doc.data))
//   );
// const queryRef = collection(db, "userstest");
// console.log(queryRef);
// const userRef = "pGmazpbuXCcZylcEwWw2BRgZQ0v1";
// const queryRef = doc(
//   db,
//   "userstest",
//   userRef,
//   "profile",
//   `${userRef}_profile`
// );
// console.log(queryRef);
// const q = onSnapshot(
//   getDoc(query(queryRef)).then((response) => {
//     console.log(response.data());
//   })
// );
// async function getUsersProfileInformation() {
//   try {
//     const userRef = "pGmazpbuXCcZylcEwWw2BRgZQ0v1";
//     const userInformationListRef = doc(
//       db,
//       "userstest",
//       userRef,
//       "profile",
//       `${userRef}_profile`
//     );
//     const userInfo = await getDoc(query(userInformationListRef));
//     let userInfoToUse = userInfo.data();
//     console.log(userInfoToUse, "in async");
//   } catch (error) {
//     alert(error.message);
//   }
// }
// getUsersProfileInformation();
// console.log(options, "in use effect");
// }, []);

//   console.log("options in use effect", options);
// }

// getDoc(queryRef).then((doc) => {
//   console.log("doc id", doc.id, doc.data());
// });

// const q = await getDoc(queryRef).then((snapshot) =>
//   console.log(
//     snapshot,
//     snapshot.docs,
//     snapshot.id,

//     "snapshot in q"
//   )
// );

// const q = query(
//   collection(db, "hearts"),
//   where("uid", "==", currentUser)
// );

// const querySnapshot = await getDoc(queryRef);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.data(), "doc data");
// });
// console.log(searchQuery, "search query");
// const q = query(queryRef, where("uid", "array-contains", searchQuery));

// getDoc(q).then((doc) => console.log(doc.data, "second get doc"));

// const checkPath = doc(db);

// const q = query(
//   collection(db, "hearts"),
//   where("uid", "==", currentUser)
// );
// const querySnap = await getDocs(q);

// console.log(searchQuery, "search query");
// if (querySnap.exists()) {
//   console.log("query exists in check uid");
// } else {
//   console.log("query doesnt exist in check uid");
// }

// const queryRef = db.collection("userstest");
// console.log(queryRef, "query ref in check uid");

// const q = query(queryRef, where("uid", "==", person.uid));

// const queryRef = query(collection(db, "userstest"));
// console.log(queryRef, "query ref");
// try {
//   const data = [];
//   const querySnapshot = await setDoc(doc());
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//     data.push(doc.data());
//   });
// const q = await getDocs(queryRef).then((snapshot) =>
//   snapshot.forEach((doc) => data.push(doc.data()))
// );
//   console.log(data);
// } catch (error) {
//   console.log(error);
// }
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.data(), "doc data");
// });
