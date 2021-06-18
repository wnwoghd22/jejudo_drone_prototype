const express = require('express');
const router = express.Router();

const checkUser = require('../middleware/checkUser');

const getUserList = require('./controllers/getUserList');

const getUser = require('./controllers/getUser');
const postUser = require('./controllers/postUser');
const deleteUser = require('./controllers/deleteUser');

const getUserSchedule = require('./controllers/getUserSchedule');
const postUserSchedule = require('./controllers/postUserSchedule');
const deleteUserSchedule = require('./controllers/deleteUserSchedule');

router.get('/list', checkUser, getUserList);

router.post('/', checkUser, postUser);
router.get('/user/:key', checkUser, getUser);
router.delete('user/:key', checkUser, deleteUser);

router.get('/user/:key/schedule', checkUser, getUserSchedule);
router.post('/user/:key/schedule', checkUser, postUserSchedule);
router.delete('/:key/schedule/:id', checkUser, deleteUserSchedule);

module.exports = router;