// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

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
export const auth = getAuth(app)