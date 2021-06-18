const admin = require('firebase-admin');

module.exports = (req, res) => {
    let _year = req.params.yyyy;
    let _month = req.params.mm;
    let _date = req.params.dd;
    let listRef = admin.database().ref(`schedule/${_year}/${_month}/${_date}`);

    listRef.once('value', snapshot => {
        let _morning = snapshot.child('morning').val();
        let _noon = snapshot.child('noon').val();
        let _afternoon = snapshot.child('afternoon').val();
        console.log(_morning);

        let morning_count = _morning ? Object.keys(_morning).length : 0;
        let noon_count = _noon ? Object.keys(_noon).length : 0;
        let afternoon_count = _afternoon ? Object.keys(_afternoon).length : 0;

        let payload = {
            morning: morning_count,
            noon: noon_count,
            afternoon: afternoon_count,
        };
        
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({info: payload});
    });
};