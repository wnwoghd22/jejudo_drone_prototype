const express = require('express');
const router = express.Router();

const checkUser = require('../middleware/checkUser');

const getNoticeList = require('./controllers/getNoticeList');
const getNotice = require('./controllers/getNotice');
const postNotice = require('./controllers/postNotice');
const deleteNotice = require('./controllers/deleteNotice');

router.get('/', checkUser, getNoticeList);
router.get('/post/:key', checkUser, getNotice);
router.post('/new', checkUser, postNotice);
router.delete('/post/:key', checkUser, deleteNotice);

module.exports = router;