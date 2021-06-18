const admin = require('firebase-admin');

module.exports = (req, res) => {
    let listRef = admin.database().ref('notice');
    listRef.once('value', function(snapshot) {
        let items = new Array();
        snapshot.forEach(function(childSnapshot) {
            let temp = childSnapshot.val();
            let contents = {
                title: temp.title,
                date: temp.date,
                writer: {
                    name: temp.writer.name,
                }
            }
            contents.id = childSnapshot.key;
            items.push(contents);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({announcements: items});
    })
};