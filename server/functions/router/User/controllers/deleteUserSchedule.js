const admin = require('firebase-admin');

module.exports = (req, res) => (req, res) => {
    let key = req.params.key;
    let id = req.params.id;
    let ref = admin.database().ref(`accounts/${key}/schedule/${id}`);
    ref.remove();
    res.status(201).send({result: "scedule delete complete"});
};