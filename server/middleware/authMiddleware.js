const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

module.exports = function (req, res, next) {
    console.log("COMING??")
    const token = req.header('Authorization');
    const actualToken = token.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log("TRY???????")
        console.log("actualTokenactualTokenactualToken------->", actualToken);
        const decoded = jwt.verify(actualToken, JWT_SECRET);
        console.log("DECODE", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
