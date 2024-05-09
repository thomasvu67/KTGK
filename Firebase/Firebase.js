// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaM5cdrDlA2low96SWkfZo3MwAE8DGHjo",
  authDomain: "ktgk-26a22.firebaseapp.com",
  projectId: "ktgk-26a22",
  storageBucket: "ktgk-26a22.appspot.com",
  messagingSenderId: "71928256657",
  appId: "1:71928256657:web:93b54533bf437f9fbe8730",
  measurementId: "G-89XBZRXBKM"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };