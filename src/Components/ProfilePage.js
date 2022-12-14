import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
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
import "react-alice-carousel/lib/alice-carousel.css";
import { useAuth } from "./AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function ProfilePage(props) {
  const [userName, SetUserName] = useState([]);
  const [promptfield, SetPromptfield] = useState([]);
  const [bio, SetBio] = useState([]);
  const [funfact, setFunfact] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  //main function
  const getUsersProfile = async (user) => {
    setLoading(true);
    console.log(user);
    try {
      const userInformationListRef = doc(
        database,
        `users`,
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

  const getInfo = () => {
    SetUserName(profileData.name);
    SetPromptfield(profileData.promptfield);
    SetBio(profileData.bio);
    setFunfact(profileData.funfact);
    setProfileImage(profileData.image);
  };

  useEffect(() => {
    getInfo();
    console.log(profileImage);
  });

  // image carousell
  const items = profileImage?.map((data) => {
    return (
      <div key={data}>
        <img
          src={data}
          alt={data}
          height="400"
          style={{ marginBottom: 10, paddingLeft: "10px" }}
        />
      </div>
    );
  });

  const responsive = {
    0: { items: 1 },

    1024: { items: 4 },
  };

  const stagePadding = {
    paddingLeft: 50,
    paddingRight: 100,
  };

  return (
    <div className="whole-container">
      <h1>Profile Page</h1>
      {loading}
      {error}
      <div className="card">
        {/* carousell on top */}
        {/* <div> */}
        <AliceCarousel
          mouseTracking
          infinite
          // autoPlayInterval={2000}
          // animationDuration={1500}
          // stagePadding={stagePadding}
          autoHeight
          items={items}
        // responsive={responsive}
        // disableSlideInfo
        // controlsStrategy="alternate"
        />
        {/* </div> */}
        <div className="container">
          {/* map information accordingly */}

          <h2 className="anime">{userName}</h2>
          <br />

          <p>bio: {promptfield}</p>
          <p className="white-container">{bio}</p>
          <br />
          <p>FunFact:</p>
          <p className="white-container">{funfact}</p>
        </div>
      </div>
    </div>
  );
}