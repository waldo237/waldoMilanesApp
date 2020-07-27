/* eslint-disable import/prefer-default-export */
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN, 
    projectId: process.env.REACT_APP_PROJECT_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  }; 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export const gProvider = new firebase.auth.GoogleAuthProvider();
export const fProvider = new firebase.auth.FacebookAuthProvider();
export const {auth} = firebase
