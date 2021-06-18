const admin = require('firebase-admin');

module.exports = (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let _part = req.params.part;

    let content = req.body;
    console.log(_date, _part, content);

    let listRef = admin.database().ref(`schedule/${_year}/${_month}/${_date}/${_part}`);
    listRef.child(content.key).set(content);

    listRef.once('value', snapshot => {
        let keys = Object.keys(snapshot.val());
        console.log(keys);
    });

    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "post complete"});
};