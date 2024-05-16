// firebaseinit.js
import { initializeApp } from 'firebase/app';

// Check if Firebase is already initialized to prevent duplication
const firebaseConfig = {
    apiKey: "AIzaSyDFtNnPcBcwsgKf-ZcJQirR2DF08ENbm0o",
    authDomain: "todo-firebase-91de6.firebaseapp.com",
    projectId: "todo-firebase-91de6",
    storageBucket: "todo-firebase-91de6.appspot.com",
    messagingSenderId: "184183948957",
    appId: "1:184183948957:web:4be1bfe7fa75b8f0487674",
    measurementId: "G-6NRP1ETMBH"
  };
const firebaseApp = initializeApp(firebaseConfig, '[CLIENT_APP_INSTANCE]');

export default firebaseApp;
