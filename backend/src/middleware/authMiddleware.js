const { verifyToken } = require('../utils/jwtUtils');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route, no token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // add user payload (like id) to request object
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: err.message });
    }
};

module.exports = { protect };