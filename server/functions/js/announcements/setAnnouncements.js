import { admin } from '../../index.js';
import { app } from '../app.js';

app.post('/announcements', (req, res) => {
    let contents = {
        date: new Date().toJSON(),
        body: req.body.body,
        user: req.user
    };
    let listRef = admin.database().ref(`announcements`);
    listRef.push(contents);
    res.header('Content-Type', 'application/json; charset = utf-8');
    res.status(201).send({result: "post complete"});
});