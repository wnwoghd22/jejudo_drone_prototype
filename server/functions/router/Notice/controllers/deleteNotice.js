const admin = require('firebase-admin');

module.exports = (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`announcements/${key}`);
    listRef.remove();
};