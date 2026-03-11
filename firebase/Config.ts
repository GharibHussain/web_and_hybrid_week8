// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, Firestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "week8-fb1e1.firebaseapp.com",
  projectId: "week8-fb1e1",
  storageBucket: "week8-fb1e1.firebasestorage.app",
  messagingSenderId: "23014146256",
  appId: "1:23014146256:web:546d20e3bd0fc4e3ab1ed5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(app);

const SHOPPING_LIST: string = "shopping_list";

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    SHOPPING_LIST,
};