import firebase from "firebase";

export default () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCjIfB1FhSoIMHwoUx_kR2mVKUxXKlIJWM",
    authDomain: "jstp-23-0.firebaseapp.com",
    databaseURL: "https://jstp-23-0.firebaseio.com",
    projectId: "jstp-23-0",
    storageBucket: "jstp-23-0.appspot.com",
    messagingSenderId: "1059091535213",
    appId: "1:1059091535213:web:fdec9f0c58197bc8f47664",
    measurementId: "G-YRBY01D0RH",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    window.firebase = firebase;
  }
};
