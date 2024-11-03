// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuPF3zYgyEc-7WoDkPlHxFdx_AEXuJ0Bw",
  authDomain: "bytewise-155.firebaseapp.com",
  projectId: "bytewise-155",
  storageBucket: "bytewise-155.appspot.com",
  messagingSenderId: "185208271399",
  appId: "1:185208271399:web:7177c16281d40bebff5402",
  measurementId: "G-H2X556RGLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);