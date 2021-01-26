const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

//account/
router.get('/', (req, res) => {
    let listRef = admin.database().ref('account');
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
router.get('/:key/schedule', (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`account/${key}/schedule`);
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
        id: req.body.id,
        authority: 'student',
        schedule: [],
    };
    let listRef = admin.database().ref('account');
    listRef.push(data);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "create account complete"});
});

module.exports = router;