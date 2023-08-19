// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzfLRmSlU9OhrInhHK-ATzzCP5iKFUYPY",
  authDomain: "todoist-828a6.firebaseapp.com",
  projectId: "todoist-828a6",
  storageBucket: "todoist-828a6.appspot.com",
  messagingSenderId: "553186207449",
  appId: "1:553186207449:web:c877ea36f411352c1580c8",
  measurementId: "G-Q10M076Z98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
