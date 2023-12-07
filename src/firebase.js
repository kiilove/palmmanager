// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAPDdM-qtyIF7tB94uknrcSXo5WxK3XWk",
  authDomain: "palm-manager.firebaseapp.com",
  projectId: "palm-manager",
  storageBucket: "palm-manager.appspot.com",
  messagingSenderId: "314165605004",
  appId: "1:314165605004:web:54ab66083509126d9d81a9",
  measurementId: "G-GQK9KNXSPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
