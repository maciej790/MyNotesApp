const db = require('../../database/db');

const checkIfNoteExist = (req, res, next) =>{
    const noteTitle = req.body.title;
    db.query("SELECT * FROM notes WHERE title = ?", [noteTitle], (err, result) =>{
        if (err) return res.status(500).json("Bład serwera");
        if(result.length) return res.status(300).json('Taka notatka już istnieje!');
        next();
    })
}

module.exports = checkIfNoteExist;