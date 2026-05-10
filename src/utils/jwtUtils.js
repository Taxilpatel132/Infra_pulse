const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT token
 * @param {string} userId - The ID to encode in the token
 * @returns {string} The signed token
 */
const generateToken = (userId) => {
    const payload = { id: userId };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1d' };

    return jwt.sign(payload, secret, options);
};

/**
 * Verifies a JWT token
 * @param {string} token - The token to verify
 * @returns {object} The decoded token payload
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};