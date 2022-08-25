import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../Db/Firebase";
import { database } from "../Db/Firebase";
import {
  updateDoc,
  doc,
  addDoc,
  collection,
  getDoc,
  query,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useScrollTrigger } from "@mui/material";

export default function Profile(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [smoker, setSmoker] = useState("");
  const [height, setHeight] = useState("");
  const [religion, setReligion] = useState("");
  const [location, setLocation] = useState("");
  const [funfact, setFunFact] = useState("");
  const [bio, setBio] = useState("");
  const [promptfield, setPromptField] = useState("");
  //state for image upload
  const [fileInputValue, setFileInputValue] = useState("");
  const [fileInputFile, setFileInputFile] = useState(null);
  const [currImages, setCurrImages] = useState([]);

  //useEffect/ function call to compare the images if it exist or not.
  // if it does not exist .. concat into the image array
  // Handle Submit for data transfer to DB

  useEffect(() => {
    async function getUsersProfile() {
      try {
        const userInformationListRef = doc(
          database,
          `userstest2`,
          `${props.CurrentUser.uid}`,
          "profile",
          `${props.CurrentUser.uid}_profile`
        );
        const userInfo = await getDoc(query(userInformationListRef));
        let userInfoToUse = userInfo.data();
        console.log(userInfoToUse);
        if (userInfo.data()) {
          setCurrImages(userInfoToUse.image);
          console.log(currImages);
        }
      } catch (error) {
        alert(error.message);
      }
    }
    getUsersProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(
      doc(
        database,
        `userstest2`,
        `${props.CurrentUser.uid}`,
        "profile",
        `${props.CurrentUser.uid}_profile`
      ),
      {
        name: name,
        gender: gender,
        age: age,
        smoker: smoker,
        height: height,
        religion: religion,
        location: location,
        funfact: funfact,
        bio: bio,
        promptfield: promptfield,
      }
    )
      .then(function (res) {
        alert("Data Uploaded to FireStore");
      })
      .catch(function (err) {
        console.log(err);
      });

    console.log(`Submitted`);
  };
  //transfer form data into realtime DB
  //Ensure routing of the file is right

  //Add photos to firestorage and upload the url to firestore
  const sendData = async (e) => {
    e.preventDefault();
    console.log(fileInputFile, fileInputValue);
    const storageRefInstance = storageRef(
      storage,
      `user_${props.CurrentUser.uid}/${fileInputFile.name}`
    );

    const profileRef = doc(
      database,
      `userstest2`,
      `${props.CurrentUser.uid}`,
      "profile",
      `${props.CurrentUser.uid}_profile`
    );

    uploadBytes(storageRefInstance, fileInputFile).then(async (snapshot) => {
      console.log("Uploaded File!");

      getDownloadURL(storageRefInstance).then(async (url) => {
        console.log(url);
        console.log(currImages);
        try {
          await updateDoc(profileRef, {
            image: arrayUnion(url),
          });
          setCurrImages([]);
          console.log(currImages);
        } catch (error) {
          console.log(error);
        }
        setFileInputValue("");
      });
    });
  };

  return (
    <div>
      <h1>Profile Setup</h1>
      <form>
        <input
          type="file"
          name="fileInputFile"
          value={fileInputValue}
          onChange={(e) => {
            console.log(e.target.files[0].name);

            setFileInputFile(e.target.files[0]);
            setFileInputValue(e.target.value);
          }}
        />
        <button onClick={(e) => sendData(e)}>Send</button>
      </form>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input
              name="name"
              value={name}
              placeholder="How would you like to be address"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Gender</p>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Choose an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Age Range</p>
            <select
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            >
              <option value="">Choose an option</option>
              <option value="18to25">18 to 25</option>
              <option value="26to35">26 to 35</option>
              <option value="36to45">36 to 45</option>
              <option value="46to55">46 to 55</option>
              <option value="56andAbove">56 and above</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Smoking Habits</p>
            <select
              name="smoker"
              value={smoker}
              onChange={(e) => setSmoker(e.target.value)}
            >
              <option value="">Choose an option</option>
              <option value="non-smoker">Non-smoker</option>
              <option value="smoker">Smoker</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Height</p>
            <select
              name="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            >
              <option value="">Choose an option</option>
              <option value="150to160">150cm to 160cm</option>
              <option value="161to170">161cm to 170cm</option>
              <option value="171to180">171cm to 180cm</option>
              <option value="181andAbove">181cm and above</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Religion</p>
            <select
              name="religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            >
              <option value="">Choose an option</option>
              <option value="buddhism">Buddhism</option>
              <option value="taoism">Taoism</option>
              <option value="islamic">Islamic</option>
              <option value="christianity">Christianity</option>
              <option value="sikhism">Sikhism</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Location</p>
            <select
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Choose an option</option>
              <option value="north">North</option>
              <option value="north-east">North-east</option>
              <option value="north-west">North-west</option>
              <option value="south">South</option>
              <option value="south-east">South-east</option>
              <option value="south-west">South-west</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>A funfact about yourself!</p>
            <textarea
              name="funfact"
              placeholder="tell us something interesting!"
              value={funfact}
              onChange={(e) => setFunFact(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Biography</p>
            <select
              name="height"
              value={promptfield}
              onChange={(e) => setPromptField(e.target.value)}
            >
              <option value="">Choose an question</option>
              <option value="What would it take for someone to take you off this app?">
                What would it take for someone to take you off this app?
              </option>
              <option
                value="If your 15 year old self could see you today, what would they
                think?"
              >
                If your 15 year old self could see you today, what would they
                think?
              </option>
              <option value="What is your idea of a perfect date?">
                What is your idea of a perfect date?
              </option>
              <option value="What is your biggest dealbreaker?">
                What is your biggest dealbreaker?
              </option>
            </select>
            <br />
            <textarea
              name="bio"
              placeholder=""
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
