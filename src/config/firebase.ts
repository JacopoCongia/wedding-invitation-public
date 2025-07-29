// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtgHS376Z_lC0SMWz_RySgAXiC9A7F8cw",
  authDomain: "wedding-invite-rsvp.firebaseapp.com",
  projectId: "wedding-invite-rsvp",
  storageBucket: "wedding-invite-rsvp.firebasestorage.app",
  messagingSenderId: "842447020605",
  appId: "1:842447020605:web:902dabbd229caac98a8054",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
