/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.GATSBY_APIKEY,
    authDomain: process.env.GATSBY_AUTH_DOMAIN, 
    databaseURL: process.env.GATSBY_DATABASE_URL,
    projectId: process.env.GATSBY_PROJECT_ID,
    storageBucket: process.env.GATSBY_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_APP_ID,
    measurementId: process.env.GATSBY_MEASUREMENT_ID,
  }; 
  // Initialize Firebase
  if (typeof window !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  }
export const gProvider = new firebase.auth.GoogleAuthProvider();
export const fProvider = new firebase.auth.FacebookAuthProvider();
export const ghProvider = new firebase.auth.GithubAuthProvider();
export const {auth, storage} = firebase
