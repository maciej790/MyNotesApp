const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
       return res.status(401).json({ message: 'Invalid token' });
    }

}

module.exports = checkToken;