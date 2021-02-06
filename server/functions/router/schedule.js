const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

/*
date = Date().date
part = {
    morning,
    noon,
    day,
}
*/

router.get('/', (req, res) => {
    
});
router.get('/:date/:part', (req, res) => {
    let _date = req.params.date;
    let _part = req.params.part;

    let listRef = admin.database().ref(`schedule/${_date}/${_part}`);

    listRef.once('value', snapshot => {
        let list = new Array();
        snapshot.forEach(child => {
            let element = child.val();
            element.id = child.key;
            list.push(element);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({list: list});
    })
});
router.post('/', (req, res) => {
    
});
router.post('/:date/:part', (req, res) => {
    let _date = req.params.date;
    let _part = req.params.part;

    let content = req.body;

    let listRef = admin.database().ref(`schedule/${_date}/${_part}`);

    listRef.child(content.key).set(content);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "post complete"});
});
router.delete('/:date/:part/:key', (req, res) => {
    let _date = req.params.date;
    let _part = req.params.part;
    let _key = req.params.key;

    let ref = admin.database().ref(`schedule/${_date}/${_part}/${_key}`);
    ref.remove();
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "schedule delete complete"});
})

module.exports = router;