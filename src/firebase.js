// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4OSgZrDM_A_gESeFsczv-vn1I3vDLHTQ",
  authDomain: "testing-32e25.firebaseapp.com",
  databaseURL: "https://testing-32e25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testing-32e25",
  storageBucket: "testing-32e25.appspot.com",
  messagingSenderId: "829660147001",
  appId: "1:829660147001:web:e32f578d9892d655474ce8",
  measurementId: "G-1Z7P3X9MTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;