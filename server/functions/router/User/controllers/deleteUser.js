const admin = require('firebase-admin');

module.exports = (req, res) =>  {
    let key = req.params.key;
    let ref = admin.database().ref(`accounts/${key}`);

    let scheduleRef = admin.database().ref(`accounts/${key}/schedule`);
    scheduleRef.once('value', snapshot => {
        snapshot.forEach(child => {
            let tempRef = admin.database().ref(
                `schedule/${child.val().date.year}/${child.val().date.month}/${child.val().date.date}/${child.val().part}/${key}`);
            tempRef.remove();
        });

        ref.remove();
        res.send({result: "account delete complete"});
    })
};