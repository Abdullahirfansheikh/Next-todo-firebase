// Import the functions you need from the SDKs you need
'use client'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import authentication module
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFtNnPcBcwsgKf-ZcJQirR2DF08ENbm0o",
  authDomain: "todo-firebase-91de6.firebaseapp.com",
  projectId: "todo-firebase-91de6",
  storageBucket: "todo-firebase-91de6.appspot.com",
  messagingSenderId: "184183948957",
  appId: "1:184183948957:web:4be1bfe7fa75b8f0487674",
  measurementId: "G-6NRP1ETMBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
// Initialize Auth
const auth = getAuth(app); // Initialize Auth with your app instance

// Now you can use 'auth' for authentication functionalities
export default {auth,analytics,db,app,firebaseConfig};
