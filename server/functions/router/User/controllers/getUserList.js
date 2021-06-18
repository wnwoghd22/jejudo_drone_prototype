const admin = require('firebase-admin');

module.exports = (req, res) => {
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
};