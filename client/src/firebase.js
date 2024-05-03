// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-30a33.firebaseapp.com",
  projectId: "mern-blog-30a33",
  storageBucket: "mern-blog-30a33.appspot.com",
  messagingSenderId: "592023304237",
  appId: "1:592023304237:web:5beb42dfae3dcb7d1a20a4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
