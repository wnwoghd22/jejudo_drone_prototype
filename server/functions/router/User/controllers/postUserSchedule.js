const admin = require('firebase-admin');

function equal(a, b) {
    if(a.date.year === b.date.year) {
        if(a.date.month === b.date.month) {
            if(a.date.date === b.date.date) {
                if(a.part === b.part) {
                    return true;
                }
            }
        }
    }
    return false;
}

module.exports = (req, res) => {
    let _date = req.body.date
    let _part = req.body.part

    let key = req.params.key;
    let data = {
        date: _date,
        part: _part,
    }
    let flag = false;
    let listRef = admin.database().ref(`accounts/${key}/schedule`);
    listRef.once('value', function(snapshot) {
        snapshot.forEach(child => {
            let temp = child.val();
            if(equal(temp, data)) {
                flag = true;
            }
        });
        if(!flag) {
            let scheduleLef = admin.database().ref(`schedule/${_date.year}/${_date.month}/${_date.date}`);
            scheduleLef.once('value', snapshot => {
                let index = snapshot.val() !== null ? Object.keys(snapshot.val()).length : 0;
                data.index = index;
                
                listRef.push(data);
            });
        }
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send(
            !flag ?
            {result: "push schedule complete"}
            : {result: "already exist"}
        );
    });
};