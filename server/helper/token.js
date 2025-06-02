const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }
}

function verifyToken(token) {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};  
