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

});
router.post('/', (req, res) => {
    
});
router.post('/:date/:part', (req, res) => {
    let _date = req.params.date;
    let _part = req.params.part;

    let temp;

    let studentRef = admin.database().ref(`accounts/${req.body.id}`);
    studentRef.once('value', function(snapshot) {
        //console.log("value: ", snapshot);

        temp = snapshot.val();
        //console.log("temp: ", temp);
        
        let content = {
            name: temp.name,
            //key: temp.key?
        };
        //console.log("content", content);

        let listRef = admin.database().ref(`schedule/${_date}/${_part}`);
        listRef.push(content);
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.status(201).send({result: "post complete"});
    });
});

module.exports = router;