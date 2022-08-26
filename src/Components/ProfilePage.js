import React, { useState, useEffect } from "react";
import { database } from "../Db/Firebase";
import {
  doc,
  getDocs,
  collection,
  getDoc,
  onSnapshot,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import AliceCarousel from "react-alice-carousel";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../Db/Firebase";
import { set } from "@firebase/database";
import { async } from "q";

export default function ProfilePage(props) {
  const [CurrentUser, setCurrentUser] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [profileImage, setProfileImage] = useState([]);

  //main function
  const getUsersProfile = async (user) => {
    setLoading(true);
    console.log(user);
    try {
      const userInformationListRef = doc(
        database,
        `userstest2`,
        `${user.uid}`,
        `profile`,
        `${user.uid}_profile`
      );

      const docSnap = await getDoc(userInformationListRef);

      if (docSnap.exists) {
        console.log(docSnap.data());
        setProfileData(docSnap.data());
        console.log(profileData);
      } else {
        setProfileData(undefined);
        console.log(" No doc");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(`running`);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUsersProfile(user);
      }
    });
    console.log(profileData);
  }, []);

  const getImage = async () => {
    setProfileImage(profileData.image);
  };

  useEffect(() => {
    getImage();
    console.log(profileImage);
  });

  const items = profileImage?.map((data) => {
    return (
      <img src={data} alt={data} height="400" style={{ marginBottom: 10 }} />
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div>
      <h1>Profile Page</h1>

      {loading}
      {error}
      {/* carousell on top */}
      {/* <button onClick={getUsersProfile}> get Data</button> */}
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={2000}
        animationDuration={1500}
        items={items}
        // responsive={responsive}
      />
      {/* map information accordingly */}
    </div>
  );
}
