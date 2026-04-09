const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * Protects routes by verifying the Bearer token in the Authorization header.
 */
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('No token provided');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];
        
        // Use the secret from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info to request
        req.user = {
            userId: decoded.id,
            email: decoded.email
        };

        next();
    } catch (err) {
        err.statusCode = 401;
        err.message = 'Authentication failed: ' + (err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token');
        next(err);
    }
};

module.exports = authMiddleware;
