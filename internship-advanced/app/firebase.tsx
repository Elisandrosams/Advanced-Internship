// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVCfTlOCVR3KrpKAI-a5zEtWQ6Yzt0JIA",
  authDomain: "internship-advanced.firebaseapp.com",
  projectId: "internship-advanced",
  storageBucket: "internship-advanced.firebasestorage.app",
  messagingSenderId: "322211617313",
  appId: "1:322211617313:web:609ee1a9e8bc8af7e2a160"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return fire;
};