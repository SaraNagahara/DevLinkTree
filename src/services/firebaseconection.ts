// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdAfDDmgGPLQmrmvCrhgRSt5RPdnID9FI",
  authDomain: "reactlinks-7c5fd.firebaseapp.com",
  projectId: "reactlinks-7c5fd",
  storageBucket: "reactlinks-7c5fd.firebasestorage.app",
  messagingSenderId: "366394304048",
  appId: "1:366394304048:web:d96f663a19e0b166b66ff5",
  measurementId: "G-PK4H0SN05M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }