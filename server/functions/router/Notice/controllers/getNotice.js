const admin = require('firebase-admin');

module.exports = (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`notice/${key}`);
    listRef.once('value', function(snapshot) {
        let item = snapshot.val();
        item.id = snapshot.key;
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({content: item});
    })
};