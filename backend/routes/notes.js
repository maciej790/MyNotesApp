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

router.patch('/update/:id', (req, res) =>{
    const userId = req.user.userId; // ID użytkownika z tokena JWT
    const noteId = req.params.id;
    const updates = req.body;

    console.log(updates);

    // Najpierw sprawdzamy, czy notatka należy do użytkownika
    const checkQuery = 'SELECT user_id FROM notes WHERE id = ?';
    
    db.query(checkQuery, [noteId], (err, result) => {
        if (err) return res.status(500).json('Błąd serwera!');
        if (result.length === 0) return res.status(404).json('Notatka nie znaleziona!');
        
        // Sprawdzenie, czy użytkownik jest właścicielem notatki
        if (result[0].user_id !== userId) {
            return res.status(403).json('Brak uprawnień do edycji tej notatki!');
        }

        // 🔹 Jeśli użytkownik jest właścicielem, wykonujemy aktualizację
        let updateQuery = 'UPDATE notes SET ';
        let updateValues = [];

        Object.keys(updates).forEach((key) => {
            updateQuery += `${key} = ?, `;
            updateValues.push(updates[key]);
        });

        updateQuery = updateQuery.slice(0, -2); // Usunięcie ostatniego przecinka
        updateQuery += ' WHERE id = ?';
        updateValues.push(noteId);

        db.query(updateQuery, updateValues, (err, result) => {
            if (err) return res.status(500).json('Błąd serwera!');
            return res.json('Notatka została zedytowana pomyślnie!');
        });
    });
})

router.delete('/delete/:id', (req, res) => {
    const userId = req.user.userId; // Pobierz ID użytkownika z tokena JWT
    const noteId = req.params.id;

    // 1️⃣ Sprawdzenie, czy notatka istnieje i czy użytkownik jest właścicielem
    const checkQuery = 'SELECT user_id FROM notes WHERE id = ?';

    db.query(checkQuery, [noteId], (err, result) => {
        if (err) return res.status(500).json('Błąd serwera!');
        if (result.length === 0) return res.status(404).json('Notatka nie znaleziona!');

        // 2️⃣ Sprawdzenie, czy użytkownik jest właścicielem notatki
        if (result[0].user_id !== userId) {
            return res.status(403).json('Brak uprawnień do usunięcia tej notatki!');
        }

        // 3️⃣ Jeśli użytkownik jest właścicielem, usuń notatkę
        const deleteQuery = 'DELETE FROM notes WHERE id = ?';

        db.query(deleteQuery, [noteId], (err, result) => {
            if (err) return res.status(500).json('Błąd serwera!');
            return res.json('Notatka została usunięta pomyślnie!');
        });
    });
});

module.exports = router;