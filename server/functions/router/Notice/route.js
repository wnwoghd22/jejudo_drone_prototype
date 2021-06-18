const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

const checkUser = require('../middleware/checkUser');

const getNoticeList = require('./controllers/getNoticeList');
const getNotice = require('./controllers/getNotice');
const postNotice = require('./controllers/postNotice');

router.get('/', checkUser, getNoticeList);
router.get('/post/:key', checkUser, getNotice);
router.post('/new', checkUser, postNotice);
router.delete('/post/:key', (req, res) => {
    let key = req.params.key;
    let listRef = admin.database().ref(`announcements/${key}`);
    listRef.remove();
});

module.exports = router;