const admin = require('firebase-admin');

module.exports = (req, res) => {
    let contents = {
        title: req.body.title,
        date: new Date().toJSON(),
        writer: {
            id: req.body.writer.id,
            name: req.body.writer.name
        },
        body: req.body.body,
    };
    let listRef = admin.database().ref(`announcements`);
    let keyRef = listRef.push(contents);
    console.log(keyRef.key);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.send({
        response : {
            result: "post complete",
            key: keyRef.key,
        }
    });
};