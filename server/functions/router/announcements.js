const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

//announcements/
router.get('/', (req, res) => {
    let listRef = admin.database().ref('announcements');
    listRef.once('value', function(snapshot) {
        let items = new Array();
        snapshot.forEach(function(childSnapshot) {
            let temp = childSnapshot.val();
            let contents = {
                title: temp.title,
                date: temp.date,
                writer: {
                    name: temp.writer.name,
                }
            }
            contents.id = childSnapshot.key;
            items.push(contents);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({announcements: items});
    })
});
router.get('/:key', (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`announcements/${key}`);
    listRef.once('value', function(snapshot) {
        let item = snapshot.val();
        item.id = snapshot.key;
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({content: item});
    })
});
router.post('/', (req, res) => {
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
    let keyRef = listRef.push(contents);
    console.log(keyRef.key);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.send({ 
        response : {
            result: "post complete",
            key: keyRef.key,
        }
    });
});
router.delete('/:key', (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`announcements/${key}`);
    listRef.remove();
});

module.exports = router;