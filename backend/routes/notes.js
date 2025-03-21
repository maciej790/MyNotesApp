const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkLogin = require('../middleware/auth/checkLogin');
const checkToken = require('../middleware/auth/checkToken');

const SECRET_KEY = 'secret';

router.get('/', checkToken, (req, res) =>{
    res.send('Get all notes');
})

module.exports = router;