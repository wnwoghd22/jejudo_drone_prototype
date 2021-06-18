const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({databaseURL:`https://jejudo-drone-prototype-default-rtdb.firebaseio.com/`});

const express = require('express');
const app = express();

const cors = require('cors')({origin: true});
app.use(cors);

//var CheckUser = require('./router/checkUser');
//app.use(CheckUser);

//var checkUser = require('./middleware/checkUser');
//app.use('*', checkUser);

var notice = require('./router/Notice/route');
var user = require('./router/User/route');
var schedule = require('./router/Schedule/route');

app.use('/notice', notice);
app.use('/accounts', user);
app.use('/schedule', schedule);

exports.v1 = functions.https.onRequest(app);