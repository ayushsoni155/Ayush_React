import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

// Firebase configuration
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
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential };
