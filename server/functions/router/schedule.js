const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

/*
date = {
    year,
    month,
    date,
}
part = {
    morning,
    noon,
    day,
}
*/

router.get('/', (req, res) => {
    
});
router.get('/:yyyy/:mm/:dd', (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let listRef = admin.database().ref(`schedule/${_year}/${_month}/${_date}`);

    listRef.once('value', snapshot => {
        let _morning = snapshot.child('morning').val();
        let _noon = snapshot.child('noon').val();
        let _afternoon = snapshot.child('afternoon').val();
        console.log(_morning);

        let morning_count = _morning ? Object.keys(_morning).length : 0;
        let noon_count = _noon ? Object.keys(_noon).length : 0;
        let afternoon_count = _afternoon ? Object.keys(_afternoon).length : 0;

        let payload = {
            morning: morning_count,
            noon: noon_count,
            afternoon: afternoon_count,
        };
        
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({info: payload});
    });
});
router.get('/:yyyy/:mm/:dd/:part', (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let _part = req.params.part;

    let listRef = admin.database().ref(`schedule/${_year}/${_month}/${_date}/${_part}`);

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
router.post('/:yyyy/:mm/:dd/:part', (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let _part = req.params.part;

    let content = req.body;
    console.log(_date, _part, content);

    let listRef = admin.database().ref(`schedule/${_year}/${_month}/${_date}/${_part}`);
    listRef.child(content.key).set(content);

    listRef.once('value', snapshot => {
        let keys = Object.keys(snapshot.val());
        console.log(keys);
    });

    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "post complete"});
});
router.delete('/:yyyy/:mm/:dd/:part/:key', (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let _part = req.params.part;
    let _key = req.params.key;

    let ref = admin.database().ref(`schedule/${_year}/${_month}/${_date}/${_part}/${_key}`);
    ref.remove();
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "schedule delete complete"});
})

module.exports = router;