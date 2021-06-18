const admin = require('firebase-admin');

module.exports = (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let _part = req.params.part;
    let _key = req.params.key;

    let ref = admin.database().ref(`schedule/${_year}/${_month}/${_date}/${_part}/${_key}`);
    ref.remove();
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "schedule delete complete"});
};