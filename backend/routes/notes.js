const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkIfNoteExist = require('../middleware/notes/checkIfNoteExist');

const SECRET_KEY = 'secret';

router.get('/', (req, res) =>{
    const userId = req.user.userId;
    
    db.query('SELECT * FROM notes WHERE user_id = ?', [userId], (err, results) =>{
        if(err) return res.status(500).json('Błąd serwera!');
        res.send(results);
    })

})

router.post('/create', checkIfNoteExist, (req, res) =>{
    const userId = req.user.userId;
    const {title, content, priority, created_at} = req.body;

    db.query('INSERT INTO notes (user_id, title, content, priority, created_at) VALUES (?,?,?,?,?)', [userId, title, content, priority, created_at], (err, result) =>{
        if(err) return res.status(500).json('Błąd serwera!');
        if(result) return res.json('Notatka została utworzona pomyślnie!');
    })
})

router.put('/update/:id', (req, res) =>{
    res.send(`Update note by note id: ${req.params.id}`);
})

router.delete('/delete/:id', (req, res) =>{
    res.send(`Delete note by note id: ${req.params.id}`);
})

module.exports = router;