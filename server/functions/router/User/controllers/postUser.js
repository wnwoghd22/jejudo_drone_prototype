const admin = require('firebase-admin');

module.exports = (req, res) => {
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
};