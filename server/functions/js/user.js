import { admin } from '../index.js';
var auth = firebase.auth();

function user(id, pw) {
    this.id = id;
    this.pw = pw;
};
const anonymous = {
    id: "anonymous@gmail.com",
    pw: "00000000"
};

function SignUp(user) {
    let id = user.id;
    let pw = user.pw;
    auth.createUserWithEmailAndPassword(id, pw);
    promise.catch(e => alert(e.message));
    alert("Sign Up");
};
const checkUser = (req, res, next) => {

};
export { app, user };

//temporary
var signUp = document.querySelector("#signUp");
signUp.onclick = () => {
    var inputId = document.querySelector("#id").value;
    var inputPw = document.querySelector("#pw").value;
    let temp = new user(inputId, inputPw);
    SignUp(temp);
}

function SignIn(user) {
    
}