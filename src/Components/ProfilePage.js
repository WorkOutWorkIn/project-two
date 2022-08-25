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
} from "firebase/firestore";
import AliceCarousel from "react-alice-carousel";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";

export default function ProfilePage(props) {
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [profileImage, setProfileImage] = useState([]);

  //main function
  const getUsersProfile = async () => {
    setLoading(true);
    try {
      const userInformationListRef = collection(
        database,
        `userstest2`,
        `${props.CurrentUser.uid}`,
        `profile`
        // `${props.CurrentUser.uid}_profile`
      );

      const docSnap = await getDocs(query(userInformationListRef, limit(1)));

      docSnap.forEach((snapshot) => {
        console.log(snapshot.id);
        console.log(snapshot.data());
      });

      // if (docSnap.exists) {
      //   console.log(docSnap.data());
      //   setProfileData((prevState) => {
      //     return { ...prevState, profileData: docSnap.data() };
      //   });
      // } else {
      //   setProfileData(undefined);
      //   console.log(" No doc");
      // }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  //testing func
  // const getUsersProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const userInformationListRef = doc(database, `testingdata`, `testing`);
  //     const docSnap = await getDoc(userInformationListRef);

  //     if (docSnap.exists) {
  //       console.log(docSnap.data());
  //       setProfileData((prevState) => {
  //         return { ...prevState, profileData: docSnap.data() };
  //       });
  //     } else {
  //       setProfileData(undefined);
  //       console.log(" No doc");
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    console.log(`running5`);

    getUsersProfile();
  }, []);

  // ------------------------------------------ NEW LIB
  // const userInformationListRef = doc(
  //   database,
  //   `userstest2`,
  //   `${props.CurrentUser.uid}`,
  //   "profile",
  //   `${props.CurrentUser.uid}_profile`
  // );

  // const UserData = useFirestoreDocumentData(
  //   [`profile`, `${props.CurrentUser.uid}_profile`],
  //   userInformationListRef
  // );

  // console.log(props);
  // console.log(UserData);

  // const items = profileData?.map((data) => {
  //   return (
  //     <img src={data.image} alt={data.image} height="400" style={{ marginBottom: 10 }} />
  //   );
  // });

  // const responsive = {
  //   0: {
  //     items: 2,
  //   },/v0/b/project-two-f29b2.appspot.com/o/user_wYniduJymrYezQh4xBmLZozBEpC2/ann-savchenko-H0h_89iFsWs-unsplash.jpeg
  //   512: {
  //     items: 4,
  //   },
  // };

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
        // items={profileData?.map((data) => {
        //   return (
        //     <img
        //       src={data.image}
        //       alt={data.image}
        //       height="400"
        //       style={{ marginBottom: 10 }}
        //     />
        //   );
        // })}
        // responsive={responsive}
      />
      {/* map information accordingly */}
    </div>
  );
  // <div>
  // <h1>Profile Page</h1>
  //   {/* carousell on top */}
  //   <AliceCarousel
  //     mouseTracking
  //     infinite
  //     autoPlayInterval={2000}
  //     animationDuration={1500}
  //     // items={profileData?.map((data) => {
  //     //   return (
  //     //     <img
  //     //       src={data.image}
  //     //       alt={data. image}
  //     //       height="400"
  //     //       style={{ marginBottom: 10 }}
  //     //     />
  //     //   );
  //     // })}
  //     // responsive={responsive}
  //   />
  //   {/* map information accordingly */}
  // </div>
}
