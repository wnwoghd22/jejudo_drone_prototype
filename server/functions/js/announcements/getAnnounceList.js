import { admin } from '../../index.js';
import { app } from '../app.js';

app.get('/announcements', (req, res) => {
    let listRef = addmin.database().ref('announcements');
    listRef.once('value', function(snapshot) {
        let items = new Array();
        snapshot.forEach(function(childSnapshot) {
            let contents = childSnapshot.val();
            contents.id = childSnapshot.key;
            items.push(contents);
        })
        res.header('Content-Type', 'application/json; charset = utf-8');
        res.send({announcements: contents});
    })
});