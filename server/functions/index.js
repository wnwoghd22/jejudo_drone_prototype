const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({databaseURL:`https://jejudo-drone-prototype-default-rtdb.firebaseio.com/`});

const express = require('express');
const app = express();

const cors = require('cors')({origin: true});
app.use(cors);

var CheckUser = require('./router/checkUser');
app.use(CheckUser);

var announcements = require('./router/announcements');
var account = require('./router/account');
var schedule = require('./router/schedule');

app.use('/announcements', announcements);
app.use('/account', account);
app.use('/schedule', schedule);

exports.v1 = functions.https.onRequest(app);