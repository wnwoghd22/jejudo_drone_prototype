const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

//account/
router.get('/', (req, res) => {
    let listRef = admin.database().ref('accounts');
    listRef.once('value', function(snapshot) {
        let items = new Array();
        snapshot.forEach(function(childSnapshot) {
            let contents = childSnapshot.val();
            contents.id = childSnapshot.key;
            items.push(contents);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({accounts: items});
    })
});
router.get('/:key', (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`accounts/${key}`);
    listRef.once('value', function(snapshot) {
        if(snapshot.exists) {
            let item = snapshot.val();
            item.id = snapshot.key;

            res.header('Content-Type', 'application/json; charset = utf-8');
            res.send({account: item});
        }
        else {
            res.send({account: null});
        }
    })
});
router.get('/:key/schedule', (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`accounts/${key}/schedule`);
    listRef.once('value', function(snapshot) {
        let items = new Array();
        snapshot.forEach(function(childSnapshot) {
            let contents = childSnapshot.val();
            contents.id = childSnapshot.key;
            items.push(contents);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({schedule: items});
    })
});
router.post('/', (req, res) => {
    let data = {
        name: req.body.name,
        authority: 'student',
        schedule: [],
    };
    let listRef = admin.database().ref('accounts');
    listRef.child(req.body.id).set(data);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "create account complete"});
});
router.post('/:key/schedule', (req, res) => {
    let key = req.params.key;
    let data = {
        date: req.body.date,
        part: req.body.part,
    }
    let listRef = admin.database().ref(`accounts/${key}/schedule`);
    //listRef.child('schedule').push(data);
    listRef.push(data);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "push schedule complete"});
});

module.exports = router;