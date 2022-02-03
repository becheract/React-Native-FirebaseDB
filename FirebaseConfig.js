// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from 'firebase';
import '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbRAe1G2f_n1ukRWx782QYXQ2HupmM9B4",
  authDomain: "final-86d0b.firebaseapp.com",
  projectId: "final-86d0b",
  storageBucket: "final-86d0b.appspot.com",
  messagingSenderId: "169527456890",
  appId: "1:169527456890:web:ee5cd5b933583aac8ef7c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = firebase.firestore(app);
export const auth = app.auth();