const admin = require('firebase-admin');

module.exports = (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let _part = req.params.part;

    let listRef = admin.database().ref(`schedule/${_year}/${_month}/${_date}/${_part}`);

    listRef.once('value', snapshot => {
        let list = new Array();
        snapshot.forEach(child => {
            let element = child.val();
            element.id = child.key;
            list.push(element);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({list: list});
    })
};