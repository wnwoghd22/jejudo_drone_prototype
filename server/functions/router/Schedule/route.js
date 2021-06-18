const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

const checkUser = require('../middleware/checkUser');

const getDateInfo = require('./controllers/getDateInfo');
const getPartInfo = require('./controllers/getPartInfo');
const postPartInfo = require('./controllers/postPartInfo');
const deletePartInfo = require('./controllers/deletePartInfo');

router.get('/', (req, res) => { });
router.post('/', (req, res) => { });

router.get('/:yyyy/:mm/:dd', checkUser, getDateInfo);

router.get('/:yyyy/:mm/:dd/:part', checkUser, getPartInfo);
router.post('/:yyyy/:mm/:dd/:part', checkUser, postPartInfo);
router.delete('/:yyyy/:mm/:dd/:part/:key', checkUser, deletePartInfo);

module.exports = router;