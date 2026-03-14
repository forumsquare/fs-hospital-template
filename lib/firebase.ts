// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZGA4xHqCsDdUworIxno8MNTqBzXwWyBw",
  authDomain: "forumsquare-db220.firebaseapp.com",
  projectId: "forumsquare-db220",
  storageBucket: "forumsquare-db220.firebasestorage.app",
  messagingSenderId: "288734448940",
  appId: "1:288734448940:web:886cb46922f7c57c3a7089",
  measurementId: "G-MHEKW08R28",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
