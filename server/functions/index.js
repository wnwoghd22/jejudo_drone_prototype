//import { user } from '../functions/js/user.js';
 
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
if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);
//firebase.analytics();

var auth = firebase.auth();
//var promise = require('promise');

//const functions = require('firebase-functions');
//const admin = require('firebase-admin');
//admin.initializeApp("https://jejudo-drone-prototype-default-rtdb.firebaseio.com/");

function user(id, pw) {
    this.id = id;
    console.log(id, this.id);
    this.pw = pw;
    console.log(pw, this.pw);
};
function SignUp(user) {
    let id = user.id;
    let pw = user.pw;
    auth.createUserWithEmailAndPassword(id, pw);
    promise.catch(e => alert(e.message));
    alert("Sign Up");
};
//temporary
var signUp = document.querySelector("#signUp");
signUp.onclick = () => {
    var inputId = document.querySelector("#id").value;
    var inputPw = document.querySelector("#pw").value;
    let temp = new user(inputId, inputPw);
    SignUp(temp);
}