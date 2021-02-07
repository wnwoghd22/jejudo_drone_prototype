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
    let listRef = admin.database().ref('accounts');
    listRef.once('value', function(snapshot) {
        if(snapshot.child(key).exists()) {
            let item = snapshot.child(key).val();
            item.id = key;

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
        phoneNum: req.body.phoneNum,
        curriculum: req.body.curriculum,
        authority: 'student',
        schedule: [],
    };
    let ref = admin.database().ref('accounts');
    ref.child(req.body.id).set(data);

    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "create account complete"});
});
router.post('/:key/schedule', (req, res) => {
    let key = req.params.key;
    let data = {
        date: req.body.date,
        part: req.body.part,
    }
    let flag = false;
    let listRef = admin.database().ref(`accounts/${key}/schedule`);
    listRef.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
            let temp = child.val();
            if(temp.date === data.date) {
                if(temp.part === data.part) {
                    flag = true;
                }
            }
        });
        if(!flag) {
            listRef.push(data);
        }
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send(
            !flag ?
            {result: "push schedule complete"}
            : {result: "already exist"}
        );
    });
});
router.delete('/:key', (req, res) => {
    let key = req.params.key;
    let ref = admin.database().ref(`accounts/${key}`);

    let scheduleRef = admin.database().ref(`accounts/${key}/schedule`);
    scheduleRef.once('value', snapshot => {
        snapshot.forEach(child => {
            let tempRef = admin.database().ref(`schedule/${child.val().date}/${child.val().part}/${key}`);
            tempRef.remove();
        });

        ref.remove();
        res.send({result: "account delete complete"});
    })

});
router.delete('/:key/schedule/:id', (req, res) => {
    let key = req.params.key;
    let id = req.params.id;
    let ref = admin.database().ref(`accounts/${key}/schedule/${id}`);
    ref.remove();
    res.status(201).send({result: "scedule delete complete"});
});

module.exports = router;