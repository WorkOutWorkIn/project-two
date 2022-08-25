import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv_6nnZ4UVIEPs7hQxaYJnFiz_ZQMeu0U",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL:
    "https://project-two-f29b2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "project-two-f29b2.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service and export the reference for other modules
// export const database = getDatabase(firebaseApp);
export const database = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
