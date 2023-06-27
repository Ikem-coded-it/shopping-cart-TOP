import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyAyA0fEUw0a_4iLD8zmcHIgBSHc-9eDxJk",
  authDomain: "ballerstore-9d13f.firebaseapp.com",
  projectId: "ballerstore-9d13f",
  storageBucket: "ballerstore-9d13f.appspot.com",
  messagingSenderId: "273218179573",
  appId: "1:273218179573:web:9a6467e540217d54db90bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };