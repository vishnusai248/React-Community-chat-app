// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIdeNugwOL-_yGSezW7Oy0xIhhKhAz-yE",
  authDomain: "react-chatapp-d8026.firebaseapp.com",
  projectId: "react-chatapp-d8026",
  storageBucket: "react-chatapp-d8026.appspot.com",
  messagingSenderId: "1017575261673",
  appId: "1:1017575261673:web:052f8327802f6cdbb3b778",
  measurementId: "G-XZ8EV6K2ML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);