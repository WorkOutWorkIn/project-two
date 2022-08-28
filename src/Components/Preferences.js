import { addDoc, collection, doc, updateDoc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { database } from "../Db/Firebase";
import "./Form.css";
import { useAuth } from "./AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Preferences(props) {
  //create state for all options
  // const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [smoker, setSmoker] = useState("");
  const [height, setHeight] = useState("");
  const [religion, setReligion] = useState("");
  const [location, setLocation] = useState("");

  const { user } = useAuth();

  //change all value to state.
  // enter type and name to all option/input value

  // Handle Change for input fields

  // Handle Submit for data transfer to DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    //change to adding a new doc
    await setDoc(
      doc(
        database,
        `userstest2`,
        `${user.uid}`,
        "preferences",
        `${user.uid}_preferences`
      ),
      {
        gender: gender,
        age: age,
        smoker: smoker,
        height: height,
        religion: religion,
        location: location,
      }
    )
      .then(function (res) {
        alert("Data Uploaded to FireStore");
      })
      .catch(function (err) {
        console.log(err);
      });

    // const data = new FormData(e.currentTarget);
    // console.log({
    //   name: data.get("name"),
    //   gender: data.get("gender"),
    //   age: data.get("age"),
    //   smoker: data.get("smoker"),
    //   height: data.get("height"),
    //   religion: data.get("religion"),
    //   location: data.get("location"),
    //   funfact: data.get("funfact"),
    // });

    console.log(`Submitted`);
  };
  //transfer form data into realtime DB
  //Ensure routing of the file is right
  return (
    <div id="pardot-form">
      <form onSubmit={handleSubmit}>
        <h1>Preferences Page</h1>
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
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </div>
  );
}
