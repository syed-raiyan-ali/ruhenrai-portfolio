import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUBD2QZLRQlKoDjKM3ratugal8RQ4Rhis",
  authDomain: "ruhenrai-portfolio.firebaseapp.com",
  projectId: "ruhenrai-portfolio",
  storageBucket: "ruhenrai-portfolio.appspot.com",
  messagingSenderId: "894653294927",
  appId: "1:894653294927:web:76bb6c8bf1dcea2f817d3a",
  measurementId: "G-3QM91DC1LS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

// NEW:
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();