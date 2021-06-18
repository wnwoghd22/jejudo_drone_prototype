const admin = require('firebase-admin');

module.exports = (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`accounts/${key}/schedule`);
    listRef.once('value', snapshot => {
        let items = new Array();
        snapshot.forEach(childSnapshot => {
            let contents = childSnapshot.val();
            contents.id = childSnapshot.key;
            
            items.push(contents);
        });
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({schedule: items});
    });
};