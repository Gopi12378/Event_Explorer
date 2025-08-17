import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDFoKDrtCJpEmLseOMxn6BAFKxazFgeSkg",
  authDomain: "eventapp-20807.firebaseapp.com",
  projectId: "eventapp-20807",
  storageBucket: "eventapp-20807.appspot.com",
  messagingSenderId: "621799483583",
  appId: "1:621799483583:web:51cef70f7a34dbc9913e0a",
  measurementId: "G-HT08M0X3PS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);       // Firebase Auth
export const db = getFirestore(app);    // Firestore DB

// Optional: export app itself for analytics or future modules
export default app;
