const db = require('../../database/db');

const checkLogin = (isSignUp) => (req, res, next) =>{
    const {login} = req.body;
    if(!login) return res.status(400).json('Wypełnij wszystkie pola!');
    db.query('SELECT * FROM users WHERE login = ?', [login], (err, result) =>{
        if (err) return res.status(500).json('Błąd serwera!');
        if(isSignUp){
            if (result.length != 0) return res.status(400).json('Ten login jest już zajęty!');
        }else{
            if (!result.length) return res.status(400).json('Błędny login lub hasło!');
            req.user = result[0];
        }
        next();
    })
}

module.exports = checkLogin;