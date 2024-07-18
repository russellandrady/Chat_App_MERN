// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-chat-app-72ab3.firebaseapp.com",
  projectId: "mern-chat-app-72ab3",
  storageBucket: "mern-chat-app-72ab3.appspot.com",
  messagingSenderId: "659235182350",
  appId: "1:659235182350:web:1b506a977e8989ca23695f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);