const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkLogin = require('../middleware/auth/checkLogin');

const SECRET_KEY = 'secret';

router.post('/signUp', checkLogin(true), async (req, res) =>{
    const {login, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query("INSERT INTO `users`(`login`, `password`) VALUES (?,?)", [login, hashedPassword], (err, result) =>{
        if (err) return res.status(500).json('Błąd serwera');
        if (result) return res.status(201).json('Zarejestrowano pomyślnie!');
    })
})

router.post('/signIn', checkLogin(false), async (req, res) =>{
    const hashedPassword = req.user.password;
    const {password} = req.body;
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) return res.status(401).json('Błędny login lub hasło!');
    const userId = req.user.id;
    const token = jwt.sign({userId}, SECRET_KEY, {expiresIn: "1h"});
    res.status(200).json(token);
})

// logout po stronie front-endu


module.exports = router;