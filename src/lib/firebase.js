// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs-oaiAwuVrTG03ZdjyFPANp05I4Yzcd8",
  authDomain: "cafeteria-unapec.firebaseapp.com",
  projectId: "cafeteria-unapec",
  storageBucket: "cafeteria-unapec.firebasestorage.app",
  messagingSenderId: "289172564610",
  appId: "1:289172564610:web:d634e2c7fef1b454d7a29b",
  measurementId: "G-EB59M3VJ0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);