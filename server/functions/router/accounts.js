const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

function equal(a, b) {
    if(a.date.year === b.date.year) {
        if(a.date.month === b.date.month) {
            if(a.date.date === b.date.date) {
                if(a.part === b.part) {
                    return true;
                }
            }
        }
    }
    return false;
}

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
        });
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({schedule: items});
    });
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
    let _date = req.body.date
    let _part = req.body.part

    let key = req.params.key;
    let data = {
        date: _date,
        part: _part,
    }
    let flag = false;
    let listRef = admin.database().ref(`accounts/${key}/schedule`);
    listRef.once('value', function(snapshot) {
        snapshot.forEach(child => {
            let temp = child.val();
            if(equal(temp, data)) {
                flag = true;
            }
        });
        if(!flag) {
            let scheduleLef = admin.database().ref(`schedule/${_date.year}/${_date.month}/${_date.date}`);
            scheduleLef.once('value', snapshot => {
                let index = snapshot.val() !== null ? Object.keys(snapshot.val()).length : 0;
                data.index = index;
                
                listRef.push(data);
            });
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
            let tempRef = admin.database().ref(
                `schedule/${child.val().date.year}/${child.val().date.month}/${child.val().date.date}/${child.val().part}/${key}`);
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