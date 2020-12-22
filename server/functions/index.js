import * as user from "../functions/js/user";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAlkvWxkFIyhX05nq4LpfnZdQBHiuAxQ70",
    authDomain: "jejudo-drone-prototype.firebaseapp.com",
    databaseURL: "https://jejudo-drone-prototype-default-rtdb.firebaseio.com",
    projectId: "jejudo-drone-prototype",
    storageBucket: "jejudo-drone-prototype.appspot.com",
    messagingSenderId: "675146639727",
    appId: "1:675146639727:web:fcf5f88a73d6b682b3209a",
    measurementId: "G-SJ40N3VG8Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const functions = require('firebase-functions');
export const admin = require('firebase-admin');
admin.initializeApp("https://jejudo-drone-prototype-default-rtdb.firebaseio.com/");