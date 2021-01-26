//const auth = require('firebase/auth');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({databaseURL:`https://jejudo-drone-prototype-default-rtdb.firebaseio.com/`});

const express = require('express');
const app = express();

const cors = require('cors')({origin: true});
app.use(cors);

//var auth = firebase.auth();
const anonymous = {
    id : "anon",
    name : "Anonymous"
}
const CheckUser = (req, res, next) => {
    req.user = anonymous;
    if(req.query.auth_token != undefined) {
        let idToken = req.query.auth_token;
        admin.auth().verifyIdToken(idToken).then(decodedToken => {
            let authUser = {
                id: decodedToken.user_id,
                name: decodedToken.name
            };
            req.user = authUser;
            next();
        }).catch(error => {
            next();
        });
    }
    else {
        next();
    }
}
app.use(CheckUser);

app.get('/announcements', (req, res) => {
    let listRef = admin.database().ref('announcements');
    listRef.once('value', function(snapshot) {
        let items = new Array();
        snapshot.forEach(function(childSnapshot) {
            let contents = childSnapshot.val();
            contents.id = childSnapshot.key;
            items.push(contents);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({announcements: items});
    })
});
app.get('/announcements/:key', (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`announcements/${key}`);
    listRef.once('value', function(snapshot) {
        console.log(snapshot);
        let item = snapshot.val();
        item.id = snapshot.key;
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({content: item});
    })
});
app.post('/announcements', (req, res) => {
    let contents = {
        title: req.body.title,
        date: new Date().toJSON(),
        writer: {
            id: req.body.writer.id,
            name: req.body.writer.name
        },
        body: req.body.body,
    };
    let listRef = admin.database().ref(`announcements`);
    listRef.push(contents);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "post complete"});
});
function initAnnounceList() {
    let listRef = admin.database().ref('announcements');
    listRef = {
        
    };
    //temporary
}

exports.v1 = functions.https.onRequest(app);