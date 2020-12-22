import { admin } from '../index.js';
const express = require('express');
const app = express();
var auth = firebase.auth();

function user(id, pw) {
    this.id = id;
    this.pw = pw;
};
const anonymous = {
    id: "anonymous@gmail.com",
    pw: "00000000"
};

const checkUser = (req, res, next) => {

};
function SignUp(user) {
    let id = user.id;
    let pw = user.pw;
    auth.createUserWithEmailAndPassword(id.value, pw.value);
    promise.catch(e => alert.message);
    alert("Sign Up");
};

export { user };