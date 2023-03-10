// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCugDq2FsN-6Ub-TVzhHDYUnMh0mDWPpV4",
  authDomain: "newsapp-5bb43.firebaseapp.com",
  projectId: "newsapp-5bb43",
  storageBucket: "newsapp-5bb43.appspot.com",
  messagingSenderId: "939121000504",
  appId: "1:939121000504:web:1f544ca34c4b997671a6cd",
  measurementId: "G-4E7JSVELE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);