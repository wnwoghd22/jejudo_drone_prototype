const admin = require('firebase-admin');

module.exports = (req, res) => {
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
};