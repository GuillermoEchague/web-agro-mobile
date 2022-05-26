import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD83QeX7PEE5hhk3Dz_SDgHje3HrhUXzkQ",
    authDomain: "diagro-db440.firebaseapp.com",
    projectId: "diagro-db440",
    storageBucket: "diagro-db440.appspot.com",
    messagingSenderId: "197985238313",
    appId: "1:197985238313:web:7697225801b112d6b1cb38",
    measurementId: "G-75T6T3GK57"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export const storage = firebase.storage();