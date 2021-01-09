//import { app } from './js/app.js';

//var auth = firebase.auth();
//var promise = require('promise');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp("https://jejudo-drone-prototype-default-rtdb.firebaseio.com/");

const express = require('express');
const app = express();

const cors = require('cors') ({origin: true});
app.use(cors);

//export { provider, app };

exports.v1 = functions.https.onRequest(app);